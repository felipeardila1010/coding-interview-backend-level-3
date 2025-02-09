import { inject, injectable } from 'inversify'
import { ItemRepository } from '../infrastructure/persistence/item.repository'
import { types } from '../dependency-injection/types'
import { LoggerInterface } from '../domain/interfaces'
import {
    DeleteRequestSchemaType,
    GetPartialRequestSchemaType,
    ItemSchemaType,
    PostRequestSchemaType,
    PutRequestSchemaType,
} from '../domain/model/item.model'

@injectable()
export class ItemService {
    constructor(
        @inject(types.itemRepository)
        private readonly itemRepository: ItemRepository
    ) {
        itemRepository.migration()
    }

    async get(): Promise<ItemSchemaType[]> {
        return await this.itemRepository.get()
    }

    async getById(
        logger: LoggerInterface,
        payload: GetPartialRequestSchemaType
    ): Promise<ItemSchemaType> {
        return await this.itemRepository.getById(payload)
    }

    async post(
        logger: LoggerInterface,
        payload: PostRequestSchemaType
    ): Promise<ItemSchemaType> {
        return await this.itemRepository.post(payload)
    }

    async put(
        logger: LoggerInterface,
        payload: PutRequestSchemaType
    ): Promise<ItemSchemaType> {
        return await this.itemRepository.put(payload)
    }

    async delete(
        logger: LoggerInterface,
        payload: DeleteRequestSchemaType
    ): Promise<number> {
        return await this.itemRepository.delete(payload)
    }
}
