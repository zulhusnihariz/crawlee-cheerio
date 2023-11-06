import cron from 'node-cron'
import { scrape } from './src/scrape'

import express from 'express'
import { getData } from './src/database/sqlite'

const app = express()
const PORT = 3000

app.get('/news', async (_, res) => {
  let data = await getData()
  res.send(data)
})

// 12 PM every day
cron.schedule('0 12 * * *', async () => await scrape(), {
  runOnInit: true,
  timezone: 'Asia/Singapore',
})

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
