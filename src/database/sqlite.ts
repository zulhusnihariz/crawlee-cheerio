import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function postData(datas: any[]) {
  const db = await open({ filename: '/tmp/database.db', driver: sqlite3.Database })

  await db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    url TEXT,
    origin TEXT,
    author TEXT,
    title TEXT PRIMARY KEY,
    description TEXT,
    content TEXT,
    createdAt TEXT,
    updatedAt TEXT)
    `)

  let statement = await db.prepare(`
  INSERT OR REPLACE INTO articles (
    title,
    url , 
    origin, 
    author, 
    description, 
    content, 
    createdAt, 
    updatedAt
    )
    VALUES (?,?,?,?,?,?,?,?)
    `)

  for (let i = 0; i < datas.length; i++) {
    const data = datas[i]
    await statement.run(data)
  }

  await statement.finalize()
  await db.close()
}

export async function getData() {
  const db = await open({ filename: '/tmp/database.db', driver: sqlite3.Database })

  const results = await db.all('SELECT * FROM articles')

  await db.close()
}
