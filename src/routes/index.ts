import { CheerioCrawlingContext, Dataset, Request, createCheerioRouter } from 'crawlee'
import { HOSTNAME, FULL_DOMAIN, COIN_DESK, RSS_FEED } from '../lib/enums/domain.enum'
import coinTelegraphRoute from './coin-telegraph'
import coinDeskRoute from './coin-desk'

export type Article = {
  url: string
  origin: string
  author: string
  title: string
  description: string
  content: string
  createdAt: string
  updatedAt: string
}

export type RouteHandler = {
  label: any
  handler: (
    ctx: Omit<CheerioCrawlingContext<any, any>, 'request'> & {
      request: Request<any>
    }
  ) => void
}

export const router = createCheerioRouter()

router.addDefaultHandler(async ({ $, enqueueLinks, log, request, body }) => {
  const url = new URL(request.url)
  switch (request.url) {
    case RSS_FEED.COIN_DESK:
      let urls = $('item link')
        .map((_, x) => $(x).text().trim())
        .toArray()
      await enqueueLinks({
        globs: [
          `${FULL_DOMAIN.COIN_DESK}/tech/**`,
          `${FULL_DOMAIN.COIN_DESK}/markets/**`,
          `${FULL_DOMAIN.COIN_DESK}/business/**`,
          `${FULL_DOMAIN.COIN_DESK}/policy/**`,
        ],
        urls,
        label: COIN_DESK.ARTICLES,
      })
      break
  }

  switch (url.host) {
    case HOSTNAME.NFT_EVENING: {
      log.info(`enqueueing: ${request.url}`)

      const data = {
        url: request.loadedUrl ?? '',
        origin: url.host,
        author: $('span.post-author a').text().trim(),
        title: $('h1.post-title').text().trim(),
        description: '',
        content: $('div.post-content').children('p').text(),
        createdAt: $('span.date time[datetime]').attr('datetime') ?? '',
        updatedAt: '',
      }

      if (data?.title && data?.content) await saveDataset(HOSTNAME.NFT_EVENING, data)
      break
    }
    case HOSTNAME.BIT_COLUMNIST: {
      log.info(`enqueueing: ${request.url}`)

      const data = {
        url: request.loadedUrl ?? '',
        origin: url.host,
        author: $('span.post-author a').text().trim(),
        title: $('h1.post-title').text().trim(),
        description: '',
        content: $('div.post-content').children('p').text(),
        createdAt: $('span.date time[datetime]').attr('datetime') ?? '',
        updatedAt: $('span.date-modified time[datetime]').attr('datetime') ?? '',
      }

      if (data?.title && data?.content) await saveDataset(HOSTNAME.BIT_COLUMNIST, data)
      break
    }
    case HOSTNAME.CRYPTO_POTATO: {
      log.info(`enqueueing: ${request.url}`)

      const data = {
        url: request.loadedUrl ?? '',
        origin: url.host,
        author: $('.entry-user a').text().trim(),
        title: $('.page-title h1').text().trim(),
        description: '',
        content: $('div.coincodex-content').children('p').text(),
        createdAt: $('.entry-date span.last-modified-timestamp').text().trim(),
        updatedAt: $('.entry-date span.last-modified-timestamp').text().trim(),
      }

      if (data?.title && data?.content) await saveDataset(HOSTNAME.CRYPTO_POTATO, data)
      break
    }

    case HOSTNAME.NFT_PLAZAS: {
      log.info(`enqueueing: ${request.url}`)

      const data = {
        url: request.loadedUrl as string,
        origin: url.host,
        author: '',
        title: $('h1.post_title').text().trim(),
        description: '',
        content: $('div.entry-content').children('p').text(),
        createdAt: '',
        updatedAt: '',
      }

      if (data?.title && data?.content) await saveDataset(HOSTNAME.NFT_PLAZAS, data)
      break
    }
  }
})

async function saveDataset(
  hostname: HOSTNAME,
  { url, origin, author, title, description, content, createdAt, updatedAt }: Article
) {
  const dataset = await Dataset.open(hostname)

  // NOTE: any changes made to the following need to also be reflected
  // for (INSERT STATEMENT) in src/database/sqlite.ts;
  // else, column name & value could be inaccurate
  await dataset.pushData({
    url,
    origin,
    author,
    title,
    description,
    content,
    createdAt,
    updatedAt,
  })
}

let routes = [...coinTelegraphRoute, ...coinDeskRoute]

routes.forEach(route => {
  router.addHandler(route.label, route.handler)
})
