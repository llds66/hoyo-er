import fs from 'node:fs/promises'
import { Hono } from 'hono'
import getDb, { zzz } from '../db/index'
import { getBvData } from '../utils/getBvData'

const app = new Hono()

app.get('/:gameID', async (c) => {
  const db = await getDb()
  const id = c.req.param('gameID')
  const bvList = await fetch(`https://test.csx.pw/bv/${id}`)
  const bvListData = await bvList.json()

  // 删除表所有数据
  await db.delete(zzz)
  // 循环更新数据库中的数据
  for (const { bvid, keywords } of bvListData as any[]) {
    const data = await getBvData(bvid)

    if (!data || !data.aid)
      continue

    await db.insert(zzz).values({
      aid: data.aid,
      bvid: data.bvid,
      title: data.title,
      pic: `https://hoyoer.csx.pw/img-proxy?url=${data.pic}`,
      copyright: data.copyright,
      owner_name: data.owner.name,
      owner_face: `https://hoyoer.csx.pw/img-proxy?url=${data.owner.face}`,
      view: data.count.view,
      like_count: data.count.like,
      coin: data.count.coin,
      favorite: data.count.favorite,
      danmaku: data.count.danmaku,
      keywords: keywords ? JSON.stringify(keywords) : null,
    })
  }
  // 导出json 文件
  const result = await db.select().from(zzz)
  await fs.writeFile(`../public/json/${id}.json`, JSON.stringify(result, null, 2))

  return c.json({ code: 0, message: 'ok' })
})

export default app
