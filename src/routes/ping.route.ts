import { Server } from '@hapi/hapi'

export const pingRoute = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true,
            }
        },
    })
}
