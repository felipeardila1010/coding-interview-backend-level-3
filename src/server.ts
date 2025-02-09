import Hapi from '@hapi/hapi';
import Pino from 'hapi-pino';
import { defineRoutes } from './routes/routes';

const pinoOptionsDev = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
};

const getServer = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000,
    debug: false
  });
  await server.register({
    plugin: Pino,
    options: {
      level: 'debug',
      ...pinoOptionsDev
    }
  });

  defineRoutes(server);

  return server;
};

export const initializeServer = async () => {
  const server = await getServer();
  await server.initialize();

  return server;
};

export const startServer = async () => {
  const server = await getServer();
  server.log(`Server running on ${server.info.uri}`);
  await server.start();

  return server;
};
