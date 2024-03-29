import HttpConfig from '../http-config';

const port = Number(process.env.PORT) || 3001;
const proto = 'http';

export const http: HttpConfig = {
  port,
  proto,
};
