import { bigint, int, mysqlTable, text, tinyint, varchar } from 'drizzle-orm/mysql-core'

export const zzz = mysqlTable('zzz', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  aid: bigint('aid', { mode: 'number' }).notNull().unique(),
  bvid: varchar('bvid', { length: 20 }).notNull(),
  title: varchar('title', { length: 255 }),
  pic: varchar('pic', { length: 255 }),
  copyright: tinyint('copyright'),
  owner_name: varchar('owner_name', { length: 100 }),
  owner_face: varchar('owner_face', { length: 255 }),
  view: int('view'),
  like_count: int('like_count'),
  coin: int('coin'),
  favorite: int('favorite'),
  danmaku: int('danmaku'),
  keywords: text('keywords'),
  updated_at: varchar('updated_at', { length: 50 }),
})
