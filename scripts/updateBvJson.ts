import fs from 'node:fs/promises'
import path from 'node:path'
import { getBvData } from './getBvData'

async function updateJson(id: string) {
  const bvList = await fetch(`https://hoyoer.csx.pw/bv/${id}`)
  let bvListData: any
  try {
    bvListData = await bvList.json()
  }
  catch (err) {
    console.error('远程 JSON 数据解析失败', err)
    return
  }

  if (!Array.isArray(bvListData)) {
    console.error('远程接口返回的数据不是数组')
    return
  }

  const resultData: any = []
  for (const { bvid, keywords } of bvListData) {
    const data = await getBvData(bvid)
    if (!data || !data.aid)
      continue

    resultData.push({
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

  const filePath = path.resolve('public/json', `${id}.json`)
  await fs.writeFile(filePath, JSON.stringify(resultData, null, 2))
  console.log(`更新完成，共 ${resultData.length} 条数据`)
}

const gameID = process.argv[2]
if (!gameID) {
  console.error('请传入 gameID，例如：pnpm update:json ys')
  process.exit(1)
}

updateJson(gameID)
