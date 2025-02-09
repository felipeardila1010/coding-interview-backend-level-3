import { ItemSchemaType } from '../../../src/domain/model/item.model'
import { ItemRepository } from '../../../src/infrastructure/persistence/item.repository'

describe('ItemRepository', () => {
    let itemRepository: ItemRepository

    beforeEach(() => {
        itemRepository = new ItemRepository()
    })

    test('should get all items', async () => {
        const items: ItemSchemaType[] = [{ id: 1, name: 'Item 1', price: 123 }]
        jest.spyOn(itemRepository, 'get').mockResolvedValue(items)

        const result = await itemRepository.get()

        expect(result).toEqual(items)
        expect(itemRepository.get).toHaveBeenCalledTimes(1)
    })

    test('should get item by id', async () => {
        const item: ItemSchemaType = { id: 1, name: 'Item 1', price: 123 }
        jest.spyOn(itemRepository, 'getById').mockResolvedValue(item)

        const result = await itemRepository.getById({ id: 1 })

        expect(result).toEqual(item)
        expect(itemRepository.getById).toHaveBeenCalledWith({ id: 1 })
    })

    test('should create a new item', async () => {
        const item: ItemSchemaType = { id: 1, name: 'New Item', price: 123 }
        jest.spyOn(itemRepository, 'post').mockResolvedValue(item)

        const result = await itemRepository.post({
            name: 'New Item',
            price: 123,
        })

        expect(result).toEqual(item)
        expect(itemRepository.post).toHaveBeenCalledWith({
            name: 'New Item',
            price: 123,
        })
    })

    test('should update an item', async () => {
        const item: ItemSchemaType = { id: 1, name: 'Updated Item', price: 123 }
        jest.spyOn(itemRepository, 'put').mockResolvedValue(item)

        const result = await itemRepository.put({
            id: 1,
            name: 'Updated Item',
            price: 123,
        })

        expect(result).toEqual(item)
        expect(itemRepository.put).toHaveBeenCalledWith({
            id: 1,
            name: 'Updated Item',
            price: 123,
        })
    })

    test('should delete an item', async () => {
        jest.spyOn(itemRepository, 'delete').mockResolvedValue(1)

        const result = await itemRepository.delete({ id: 1 })

        expect(result).toEqual(1)
        expect(itemRepository.delete).toHaveBeenCalledWith({ id: 1 })
    })
})
