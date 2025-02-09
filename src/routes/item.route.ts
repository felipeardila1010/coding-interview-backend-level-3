import { Server } from '@hapi/hapi'
import { itemService } from '../dependency-injection/dependencies'
import {
    deleteRequestSchema,
    postRequestSchema,
    putRequestSchema,
} from '../domain/model/item.model'

export const itemRoutes = (server: Server, basePath: string) => {
    server.route({
        method: 'GET',
        path: `${basePath}`,
        handler: async (request, h) => {
            request.log(['get-item'], 'input-get-item')
            const data = await itemService.get()

            return h.response({ data }).code(200)
        },
    })

    server.route({
        method: 'POST',
        path: `${basePath}`,
        handler: async (req, h) => {
            req.log(['post-item'], 'input-post-item')

            // validate request
            const request = postRequestSchema.safeParse(req.payload || {})
            if (!request.success) {
                return h.response({ error: request.error }).code(400)
            }
            // business rules
            const itemId = await itemService.post(req.logger, request.data)

            return h.response({ data: { itemId } }).code(201)
        },
    })

    server.route({
        method: 'PUT',
        path: `${basePath}/{id}`,
        handler: async (req, h) => {
            req.log(['put-item'], 'input-put-item')

            // validate request
            const request = putRequestSchema.safeParse(
                Object.assign(req.payload || {}, req.params)
            )
            if (!request.success) {
                return h.response({ error: request.error }).code(400)
            }
            // business rules
            await itemService.put(req.logger, request.data)

            return h.response({}).code(204)
        },
    })

    server.route({
        method: 'DELETE',
        path: `${basePath}/{id}`,
        handler: async (req, h) => {
            req.log(['delete-item'], 'input-delete-item')

            // validate request
            const request = deleteRequestSchema.safeParse(req.params)
            if (!request.success) {
                return h.response({ error: request.error }).code(400)
            }
            // business rules
            const itemId = await itemService.delete(req.logger, request.data)

            return h.response({ data: { itemId } }).code(200)
        },
    })
}
