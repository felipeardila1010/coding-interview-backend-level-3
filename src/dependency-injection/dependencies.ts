import { types } from './types'
import { container } from './inversify'
import { ItemService } from '../application/item.service'

export const itemService = container.get<ItemService>(types.itemService)
