import fs from 'node:fs/promises'
import { Hono } from 'hono'
import getDb, { zzz } from '../db/index'
import { getBvData } from '../utils/getBvData'

const app = new Hono()

app.get('/:gameID', async (c) => {
  const db = await getDb()
  const id = c.req.param('gameID')
  const bvList = await fetch(`https://test.csx.pw/bv/${id}`)
  let bvListData: any

  try {
    bvListData = await bvList.json()
  }
  catch (err) {
    return c.json({ code: 500, message: '远程 JSON 数据解析失败', err })
  }

  if (!Array.isArray(bvListData)) {
    return c.json({ code: 500, message: '远程接口返回的数据不是数组' })
  }

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
  console.log(`更新完成，共 ${result.length} 条数据`)

  return c.json({
    code: 0,
    mes1: 'ok',
    mes2: `更新 ${result.length} 条数据`,
    mes3: `生成 ${id}.json 文件`,
  })
})

export default app
