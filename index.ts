import cron from 'node-cron'
import express from 'express'
import cors from 'cors'
import { scrape } from './src/scrape'
import { getData, getTodaysData } from './src/database/sqlite'

const app = express()
const PORT = 3000

app.use(
  cors({
    origin: ['*'],
    methods: 'GET,POST,PATCH,DELETE',
  })
)

app.get('/api/news/today', async (_, res) => {
  let data = await getTodaysData()
  res.send(data)
})

app.get('/api/news', async (_, res) => {
  let data = await getData()
  res.send(data)
})

// 12 PM every day
cron.schedule(
  '0 12 * * *',
  async () => {
    console.log('initializing cron job...')
    await scrape()
  },
  {
    runOnInit: true,
    timezone: 'Asia/Singapore',
  }
)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
