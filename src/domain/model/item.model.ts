/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'

const itemSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
})

export const postRequestSchema = itemSchema.pick({
    name: true,
    price: true,
})
export const putRequestSchema = itemSchema.pick({
    id: true,
    name: true,
    price: true,
})
export const deleteRequestSchema = itemSchema.pick({
    id: true,
})

export type ItemSchemaType = z.infer<typeof itemSchema>
export type PostRequestSchemaType = z.infer<typeof postRequestSchema>
export type PutRequestSchemaType = z.infer<typeof putRequestSchema>
export type DeleteRequestSchemaType = z.infer<typeof deleteRequestSchema>
