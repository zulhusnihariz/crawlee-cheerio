import { CheerioCrawler, Dataset } from 'crawlee'
import { router } from './routes/index.js'
import { HOSTNAME, RSS_FEED } from './lib/enums/domain.enum.js'

import * as cheerio from 'cheerio'
import { getData, postData } from './database/sqlite.js'

const crawler = new CheerioCrawler({
  additionalMimeTypes: ['application/rss+xml'],
  requestHandler: router,
  maxRequestsPerMinute: 5,
  sameDomainDelaySecs: 60,
})

async function extractLinksFromFeed(urls: string[]): Promise<void> {
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
      const urls = $('item link')
        .map((_, x) => $(x).text().trim())
        .toArray()
      return acc.concat(urls)
    },
    [RSS_FEED.COIN_DESK] as string[]
  )

  //

  shuffleURLs(startUrls)

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

await extractLinksFromFeed([RSS_FEED.NFT_EVENING, RSS_FEED.BIT_COLUMNIST, RSS_FEED.CRYPTO_POTATO, RSS_FEED.NFT_PLAZAS])

function shuffleURLs(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
