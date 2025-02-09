import 'reflect-metadata'

import { Container } from 'inversify'
import { ItemService } from '../application/item.service'
import { types } from './types'
import { ItemRepository } from '../infrastructure/persistence/item.repository'

export const container = new Container()
container.bind<ItemService>(types.itemService).to(ItemService)
container.bind<ItemRepository>(types.itemRepository).to(ItemRepository)
