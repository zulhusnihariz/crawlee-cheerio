import { CheerioCrawler, ProxyConfiguration, downloadListOfUrls } from 'crawlee'
import { router } from './routes/index.js'
import { FULL_DOMAIN } from './lib/enums/domain.enum.js'

const startUrls = [
  //`${FULL_DOMAIN.COIN_TELEGRAPH}/post-sitemap-1`,
  // `${FULL_DOMAIN.COIN_DESK}/sitemap`,
  // `${FULL_DOMAIN.NFT_NOW}/news/trezor-celebrates-10-years-with-new-self-custody-products/s`,
  // `${FULL_DOMAIN.NFT_EVENING}/news`,
]

const crawler = new CheerioCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
  maxConcurrency: 20,
  maxRequestsPerMinute: 120,
})

// await crawler.run(startUrls)

let listOfUrls = await downloadListOfUrls({
  url: `https://cointelegraph.com/post-sitemap-9`,
})

const filtered = listOfUrls.filter(el => el.startsWith(FULL_DOMAIN.COIN_TELEGRAPH))

crawler.run(filtered)
