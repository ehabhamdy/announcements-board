import BaseApp from './base-app';
import AppConfig from './config/app-config';
import serverConfig from './config/values/server.config';
import { Application } from 'express';
import { AnnouncementsInmemoryAdapter } from '../datastore/announcements-inmemory-adapter';

export default class Server extends BaseApp {
  constructor() {
    super();
  }

  public static async bootstrap(): Promise<Server> {
    const server = new Server();
    await server.start();
    return server;
  }

  public getExpressApplication(): Application {
    return this.app;
  }

  public getAppStorage() {
    return new AnnouncementsInmemoryAdapter();
  }

  getConfig(): AppConfig {
    return serverConfig;
  }
}
