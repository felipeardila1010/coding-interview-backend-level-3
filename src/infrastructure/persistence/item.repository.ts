import { Database } from 'sqlite3'
import { injectable } from 'inversify'
import { ITEM_TABLE } from '../../../db/migration.db'
import {
    DeleteRequestSchemaType,
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
    async post(payload: PostRequestSchemaType): Promise<number> {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO item (name, price) VALUES (?, ?)`,
                [payload.name, payload.price],
                function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(this.lastID)
                    }
                }
            )
        })
    }
    async put(payload: PutRequestSchemaType): Promise<number> {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE item SET name = ?, price = ? WHERE id = ?`,
                [payload.name, payload.price, payload.id.toString()],
                function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(this.changes)
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
                        resolve(this.changes)
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
