import { Server } from '@hapi/hapi';

export const defineRoutes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: async (request, h) => {
      request.log(['ping'], 'ping received');

      return {
        ok: true
      };
    }
  });
};
