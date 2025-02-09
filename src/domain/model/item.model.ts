/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'

const itemSchema = z.object({
    id: z.number({ message: 'Field "id" is required' }),
    name: z.string({ message: 'Field "name" is required' }),
    price: z
        .number({ required_error: 'Field "price" is required' })
        .nonnegative({ message: 'Field "price" cannot be negative' }),
})

export const getPartialRequestSchema = itemSchema.pick({
    id: true,
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
export type GetPartialRequestSchemaType = z.infer<
    typeof getPartialRequestSchema
>
export type PostRequestSchemaType = z.infer<typeof postRequestSchema>
export type PutRequestSchemaType = z.infer<typeof putRequestSchema>
export type DeleteRequestSchemaType = z.infer<typeof deleteRequestSchema>
