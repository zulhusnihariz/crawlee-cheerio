import { CheerioCrawler, Dataset } from 'crawlee'
import { router } from './routes/'
import { HOSTNAME, RSS_FEED } from './lib/enums/domain.enum'

import * as cheerio from 'cheerio'

import { getData, postData } from './database/sqlite'

function shuffleURLs(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

type RSSData = {
  url: string
  createdAt: string
  title: string
  author: string
}

async function extractLinksFromFeed(urls: string[]): Promise<{ url: string; userData: RSSData }[]> {
  const responses = await Promise.all(urls.map(url => fetch(url)))

  const xmls = []
  for (const response of responses) {
    try {
      const xml = await response.text()
      xmls.push(xml)
    } catch (error) {
      console.error(`Error fetching XML from ${response.url}: ${error}`)
    }
  }

  const startUrls = xmls.reduce(
    (acc, xml) => {
      const $ = cheerio.load(xml, { xmlMode: true })
      const urls = $('item')
        .map((_, x) => {
          const url = $(x).children('link').text().trim()
          let createdAt = $(x).children('pubDate').text().trim()
          let title = $(x).children('title').text().trim()
          let author = $(x).children('dc\\:creator').text().trim()

          if (createdAt) createdAt = new Date(createdAt).toISOString()
          return { url, userData: { url, createdAt, title, author } }
        })
        .toArray()

      return acc.concat(urls)
    },
    [] as { url: string; userData: RSSData }[]
  )

  shuffleURLs(startUrls)

  return startUrls
}

export async function scrape() {
  const crawler = new CheerioCrawler({
    additionalMimeTypes: ['application/rss+xml'],
    requestHandler: router,
    maxRequestsPerMinute: 5,
    sameDomainDelaySecs: 60,
  })

  const startUrls = await extractLinksFromFeed([
    RSS_FEED.AMBCRYPTO,
    RSS_FEED.BEINCRYPTO,
    RSS_FEED.BIT_COLUMNIST,
    RSS_FEED.BLOCKONOMI,
    RSS_FEED.COIN_DESK,
    RSS_FEED.COIN_SPEAKER,
    RSS_FEED.COIN_TELEGRAPH,
    RSS_FEED.CRYPTO_NEWSZ,
    RSS_FEED.CRYPTO_POTATO,
    RSS_FEED.CRYPTO_SLATE,
    RSS_FEED.DAILY_COIN,
    RSS_FEED.NFT_EVENING,
    RSS_FEED.NFT_PLAZAS,
  ])

  // filter out saved articles
  let articles = await getData()

  for (let i = 0, total = articles.length; i < total; i++) {
    let article = articles[i]
    let index = startUrls.findIndex(el => el.url === article.url)
    if (index >= 0) startUrls.splice(index, 1)
  }
  // end filter

  await crawler.run(startUrls)

  let datas: any[] = []

  for (let i = 0, hostNames = Object.values(HOSTNAME); i < hostNames.length; i++) {
    const hostName = hostNames[i]
    let dataset = await Dataset.open(hostName)
    const items = (await dataset.getData()).items

    datas = datas.concat(items.map(el => Object.values(el)))
  }

  await postData(datas)
}
