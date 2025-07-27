import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import updateRoutes from './router/update'
// 👈 引入工具函数
import { startSchedule } from './utils/schedule'
import 'dotenv/config'

const app = new Hono()

app.use('*', cors({ origin: '*' }))
app.get('/favicon.ico', c => c.text('Not found', 404))
app.route('/', updateRoutes)

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
    console.log(`Updata YS http://localhost:${info.port}/ys`)
    console.log(`Updata BT http://localhost:${info.port}/bt`)
    console.log(`Updata ZZZ http://localhost:${info.port}/zzz`)
    // 👇 启动定时任务
    startSchedule({
      port: info.port,
      endpoints: ['/ys', '/bt', '/zzz'],
      intervalMs: 10000,
      immediate: true, // 可选：启动时执行一次
    })
  },
)
