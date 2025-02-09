import 'reflect-metadata'
import { ItemService } from '../../src/application/item.service'
import { LoggerInterface } from '../../src/domain/interfaces'
import {
    DeleteRequestSchemaType,
    GetPartialRequestSchemaType,
    ItemSchemaType,
    PostRequestSchemaType,
    PutRequestSchemaType,
} from '../../src/domain/model/item.model'

jest.mock('../../src/infrastructure/persistence/item.repository')

describe('ItemService', () => {
    const itemRepository = {
        get: jest.fn(),
        getById: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        migration: jest.fn(),
    }
    let itemService = new ItemService(itemRepository)
    let logger: LoggerInterface

    beforeEach(() => {
        logger = {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        } as unknown as LoggerInterface
    })

    test('should get all items', async () => {
        const items: ItemSchemaType[] = [{ id: 1, name: 'Item 1', price: 123 }]
        itemRepository.get.mockResolvedValue(items)

        const result = await itemService.get()

        expect(result).toEqual(items)
        expect(itemRepository.get).toHaveBeenCalledTimes(1)
    })

    it('should get item by id', async () => {
        const item: ItemSchemaType = { id: 1, name: 'Item 1', price: 123 }
        const payload: GetPartialRequestSchemaType = { id: 1 }
        itemRepository.getById.mockResolvedValue(item)

        const result = await itemService.getById(logger, payload)

        expect(result).toEqual(item)
        expect(itemRepository.getById).toHaveBeenCalledWith(payload)
    })

    it('should create a new item', async () => {
        const item: ItemSchemaType = { id: 1, name: 'New Item', price: 123 }
        const payload: PostRequestSchemaType = { name: 'New Item', price: 123 }
        itemRepository.post.mockResolvedValue(item)

        const result = await itemService.post(logger, payload)

        expect(result).toEqual(item)
        expect(itemRepository.post).toHaveBeenCalledWith(payload)
    })

    it('should update an item', async () => {
        const item: ItemSchemaType = { id: 1, name: 'Updated Item', price: 123 }
        const payload: PutRequestSchemaType = {
            id: 1,
            name: 'Updated Item',
            price: 123,
        }
        itemRepository.put.mockResolvedValue(item)

        const result = await itemService.put(logger, payload)

        expect(result).toEqual(item)
        expect(itemRepository.put).toHaveBeenCalledWith(payload)
    })

    it('should delete an item', async () => {
        const payload: DeleteRequestSchemaType = { id: 1 }
        itemRepository.delete.mockResolvedValue(1)

        const result = await itemService.delete(logger, payload)

        expect(result).toEqual(1)
        expect(itemRepository.delete).toHaveBeenCalledWith(payload)
    })
})
