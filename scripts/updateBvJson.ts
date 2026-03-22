import fs from 'node:fs/promises'
import path from 'node:path'
import { getBvData } from './getBvData'

async function updateJson(id: string) {
  const bvList = await fetch(`https://hy-bv-api.llds.cloud/bv/${id}`)
  let bvListData: any
  try {
    bvListData = await bvList.json()
  }
  catch (err) {
    console.error('远程 JSON 数据解析失败', err)
    process.exitCode = 1
    return
  }

  if (!Array.isArray(bvListData)) {
    console.error('远程接口返回的数据不是数组')
    process.exitCode = 1
    return
  }

  const resultData: any[] = []
  let failedCount = 0

  for (const { bvid, keywords } of bvListData) {
    const data = await getBvData(bvid)
    if (!data || !data.aid) {
      failedCount++
      continue
    }

    resultData.push({
      aid: data.aid,
      bvid: data.bvid,
      title: data.title,
      pic: `https://hy-bv-api.llds.cloud/img-proxy?url=${data.pic}`,
      copyright: data.copyright,
      owner_name: data.owner.name,
      owner_face: `https://hy-bv-api.llds.cloud/img-proxy?url=${data.owner.face}`,
      view: data.count.view,
      like_count: data.count.like,
      coin: data.count.coin,
      favorite: data.count.favorite,
      danmaku: data.count.danmaku,
      keywords: keywords ? JSON.stringify(keywords) : null,
    })
  }

  const total = bvListData.length
  const filePath = path.resolve('public/json', `${id}.json`)

  if (total > 0 && resultData.length === 0) {
    console.error(`更新失败：${id} 共 ${total} 条来源数据，但 0 条成功，已跳过写入，避免清空文件`)
    process.exitCode = 1
    return
  }

  const successRate = total === 0 ? 1 : resultData.length / total
  if (total >= 5 && successRate < 0.5) {
    console.error(`更新失败：${id} 成功率过低（${resultData.length}/${total}），已跳过写入，避免部分异常覆盖`)
    process.exitCode = 1
    return
  }

  await fs.writeFile(filePath, JSON.stringify(resultData, null, 2))
  console.log(`更新完成：${id}，共 ${resultData.length} 条数据，失败 ${failedCount} 条`)
}

const gameID = process.argv[2]
if (!gameID) {
  console.error('请传入 gameID，例如：pnpm update:json ys')
  process.exit(1)
}

updateJson(gameID)
