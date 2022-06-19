import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import AppConfig from './config/app-config';
import * as path from 'path';
import baseRouter from '../routes/base.route';
import morgan from 'morgan';
import { RouterModel } from '../models/router-model';
import announcementRoute from '../routes/announcement.route';
import { ExpressError } from '../models/Error';

export default abstract class BaseApp {
  protected app: express.Application = express();

  public async start(): Promise<void> {
    const { port } = this.getConfig().http;
    this.app.set('port', port);

    this.applyExpressMiddleWare(this.app);

    this.getExpressRoutes().forEach(({ contextPath, router }) => {
      this.app?.use(contextPath, router);
    });

    this.applyErrorMiddleWare(this.app);
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

  protected applyErrorMiddleWare(app: express.Application): void {
    app.use(
      (
        err: ExpressError,
        _req: Request,
        res: Response,
        _next: NextFunction
      ) => {
        console.error(err.message);
        if (!err.statusCode) {
          err.statusCode = 500;
        } // If err has no specified error code, set error code to 'Internal Server Error (500)'
        res.status(err.statusCode).json({ message: err.message }).end();
      }
    );
  }

  public getExpressRoutes(): Array<RouterModel> {
    return [
      { contextPath: '/api/v1/base', router: baseRouter },
      { contextPath: '/api/v1/announcements', router: announcementRoute },
    ];
  }

  public abstract getConfig(): AppConfig;
}
