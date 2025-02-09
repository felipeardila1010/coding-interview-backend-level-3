import { Server } from '@hapi/hapi';
import { itemRoutes } from './item.route';

export const defineRoutes = (server: Server) => {
  itemRoutes(server, '/item');
};
