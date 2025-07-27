## 根据最新bv列表数据,更新hoyo-er数据库数据,导出最新json文件

```
pnpm run dev
```

更新生成请求(默认10s定时更新)
- GET http://localhost:3000/ys
- GET http://localhost:3000/bt
- GET http://localhost:3000/zzz

## API
+ 根据 bvid 获取视频详情 (GET 本地)
https://api.bilibili.com/x/web-interface/view/detail
