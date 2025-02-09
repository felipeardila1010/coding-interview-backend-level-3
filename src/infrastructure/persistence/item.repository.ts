import { Database } from 'sqlite3'
import { injectable } from 'inversify'
import { ITEM_TABLE } from '../../../db/migration.db'
import {
    DeleteRequestSchemaType,
    GetPartialRequestSchemaType,
    ItemSchemaType,
    PostRequestSchemaType,
    PutRequestSchemaType,
} from '../../domain/model/item.model'
const db = new Database(':memory:')

@injectable()
export class ItemRepository {
    async get(): Promise<ItemSchemaType[]> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM item', [], (err, rows: ItemSchemaType[]) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    async getById(
        payload: GetPartialRequestSchemaType
    ): Promise<ItemSchemaType> {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM item WHERE id = ?',
                [payload.id],
                (err, row) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(row as ItemSchemaType)
                    }
                }
            )
        })
    }
    async post(payload: PostRequestSchemaType): Promise<ItemSchemaType> {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO item (name, price) VALUES (?, ?)`,
                [payload.name, payload.price],
                function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            id: this.lastID,
                            name: payload.name,
                            price: payload.price,
                        })
                    }
                }
            )
        })
    }
    async put(payload: PutRequestSchemaType): Promise<ItemSchemaType> {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE item SET name = ?, price = ? WHERE id = ?`,
                [payload.name, payload.price, payload.id.toString()],
                function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            id: payload.id,
                            name: payload.name,
                            price: payload.price,
                        })
                    }
                }
            )
        })
    }
    async delete(payload: DeleteRequestSchemaType): Promise<number> {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM item WHERE id = ?`,
                [payload.id.toString()],
                function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(payload.id)
                    }
                }
            )
        })
    }
    async migration() {
        db.exec(ITEM_TABLE)
        console.log('migration success')
    }
}
