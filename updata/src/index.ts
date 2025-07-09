import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import updateRoutes from './router/update'
import 'dotenv/config'

const app = new Hono()

app.use('*', cors({ origin: '*' }))
app.route('/', updateRoutes)

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
    console.log(`Updata YS http://localhost:${info.port}/ys`)
    console.log(`Updata BT http://localhost:${info.port}/bt`)
    console.log(`Updata ZZZ http://localhost:${info.port}/zzz`)
  },
)
