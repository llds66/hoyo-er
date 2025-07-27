interface ScheduleOptions {
  port: number
  endpoints: string[]
  intervalMs?: number // 毫秒，默认10分钟
  immediate?: boolean // 是否立即执行一次
}

export function startSchedule({ port, endpoints, intervalMs = 10000, immediate = true }: ScheduleOptions) {
  console.log(`定时任务开始 time:[${intervalMs}]毫秒`)
  const base = `http://localhost:${port}`

  const callEndpoints = async () => {
    for (const endpoint of endpoints) {
      try {
        const res = await fetch(`${base}${endpoint}`)
        const data = await res.text()
        console.log(`[定时请求] ${endpoint} 返回：`, data)
      }
      catch (err) {
        console.error(`[定时请求] ${endpoint} 失败：`, err)
      }
    }
    console.log(`-----------------`)
  }

  // 立即执行一次（可选）
  if (immediate)
    callEndpoints()

  // 开始定时任务
  setInterval(callEndpoints, intervalMs)
}
