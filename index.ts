import express from 'express'
import { getData } from './src/database/sqlite'

const app = express()
const PORT = 3000

app.get('/', async (_, res) => {
  let data = await getData()
  res.send(data)
})

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
