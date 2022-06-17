import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import AppConfig from './config/app-config';
import * as path from 'path';
import baseRouter from '../routes/base.route';
import morgan from 'morgan';
import { RouterModel } from '../models/router-model';
import announcementRoute from '../routes/announcement.route';

export default abstract class BaseApp {
  protected app: express.Application = express();

  public async start(): Promise<void> {
    const { port } = this.getConfig().http;
    this.app.set('port', port);

    this.applyExpressMiddleWare(this.app);

    this.getExpressRoutes().forEach(({ contextPath, router }) => {
      this.app?.use(contextPath, router);
    });
  }

  protected applyExpressMiddleWare(app: express.Application): void {
    if (this.getConfig().nodeEnv == 'development') {
      app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/images', express.static(path.join(__dirname, '../images')));
    app.all('/', (_: Request, res: Response) => {
      res.redirect('/api/v1/base');
    });
    app.use((_, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, C-Requested-With, Content-Type, Accept, Authorization'
      );
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      );
      next();
    });
  }

  public getExpressRoutes(): Array<RouterModel> {
    return [
      { contextPath: '/api/v1/base', router: baseRouter },
      { contextPath: '/api/v1/announcements', router: announcementRoute },
    ];
  }

  public abstract getConfig(): AppConfig;
}
