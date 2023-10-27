import fs from 'fs'
import readline from 'readline'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputFilePath = path.join(__dirname, '..', 'storage', 'key_value_stores', 'default', 'www.coindesk.com.json')
const outputDirectory = path.join(__dirname, '..', 'chunks')
const chunkSize = 1000 // Adjust the chunk size as needed

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory)
}

const array = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'))

const chunks: any[] = []

let index = 0

for (let i = 0; i < array.length; i++) {
  if (!chunks[index]) chunks[index] = []

  if (chunks[index].length == 1000) {
    index++
    chunks[index] = []
  }

  chunks[index].push(array[i])
}

for (let i = 0; i < chunks.length; i++) {
  fs.writeFileSync(`${outputDirectory}/${i}.json`, JSON.stringify(chunks[i]))
}
console.log(chunks)
