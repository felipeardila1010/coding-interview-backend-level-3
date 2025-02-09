import { Server } from '@hapi/hapi'
import { itemRoutes } from './items.route'
import { pingRoute } from './ping.route'

export const defineRoutes = (server: Server) => {
    pingRoute(server)
    itemRoutes(server, '/items')
}
