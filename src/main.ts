import { CheerioCrawler } from 'crawlee'
import { router } from './routes/index.js'
import { RSS_FEED } from './lib/enums/domain.enum.js'

import * as cheerio from 'cheerio'

const crawler = new CheerioCrawler({
  additionalMimeTypes: ['application/rss+xml'],
  requestHandler: router,
  maxRequestsPerMinute: 2,
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

  const startUrls = xmls.reduce((acc, xml) => {
    const $ = cheerio.load(xml, { xmlMode: true })
    const urls = $('item link')
      .map((_, x) => $(x).text().trim())
      .toArray()
    return acc.concat(urls)
  }, [] as string[])

  await crawler.run(startUrls)
}

await extractLinksFromFeed([RSS_FEED.NFT_EVENING, RSS_FEED.BIT_COLUMNIST])
