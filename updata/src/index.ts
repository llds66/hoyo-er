import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { corsMiddleware } from './middleware/cors'

import updateRoutes from './router/update'
import 'dotenv/config'

const app = new Hono()

app.use('*', corsMiddleware)
app.route('/', updateRoutes)

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
