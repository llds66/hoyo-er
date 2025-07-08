export async function getBvData(bvid: string) {
  const responseData = {
    bvid: '',
    aid: 0,
    copyright: 1,
    title: '',
    pic: '',
    // up
    owner: {
      name: '',
      face: '',
    },
    count: {
      view: 0, // 播放
      like: 0, // 点赞
      coin: 0, // 投币
      favorite: 0, // 收藏
      danmaku: 0, // 弹幕
    },
  }
  const url = new URL('https://api.bilibili.com/x/web-interface/view/detail')
  url.searchParams.set('bvid', bvid)
  url.searchParams.set('need_elec', '1')
  const response = await fetch(url.toString())
  const data: any = await response.json()
  responseData.bvid = data.data.View.bvid
  responseData.aid = data.data.View.aid
  responseData.copyright = data.data.View.copyright
  responseData.owner.name = data.data.View.owner.name
  responseData.owner.face = data.data.View.owner.face
  responseData.title = data.data.View.title
  responseData.pic = data.data.View.pic
  responseData.count.view = data.data.View.stat.view
  responseData.count.like = data.data.View.stat.like
  responseData.count.coin = data.data.View.stat.coin
  responseData.count.favorite = data.data.View.stat.favorite
  responseData.count.danmaku = data.data.View.stat.danmaku
  return responseData
}
