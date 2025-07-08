import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { zzz } from './schema'

let db: ReturnType<typeof drizzle> | null = null

export default async function getDb() {
  if (!db) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'hoyo-er',
      password: '55015',
    })
    db = drizzle(connection)
  }
  return db
}

export {
  zzz,
}
