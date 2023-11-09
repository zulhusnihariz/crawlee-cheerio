import { CheerioCrawlingContext, Dataset, Request, constructGlobObjectsFromGlobs, createCheerioRouter } from 'crawlee'
import { HOSTNAME } from '../lib/enums/domain.enum'
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
  htmlContent: string
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

router.addDefaultHandler(async ({ $, log, request }) => {
  const url = new URL(request.url)
  log.info(`enqueueing: ${request.url}`)
  const { author, title, createdAt } = request.userData

  let data = {
    url: request.url,
    origin: url.host,
    author,
    title,
    description: '',
    content: '',
    createdAt,
    updatedAt: '',
    htmlContent: '',
  }

  switch (url.host) {
    case HOSTNAME.AMBCRYPTO:
      data.content = $('div.single-post-main-middle').children('p').text().trim()
      data.description = $('span.single-post-excerpt p').text().trim()
      data.htmlContent = $('div.single-post-main-middle').children('p').toString()
      break
    case HOSTNAME.BEINCRYPTO: {
      data.content = $('div.entry-content-inner').children('p').text().trim()
      data.htmlContent = $('div.entry-content-inner').children('p').toString()
      break
    }
    case HOSTNAME.BIT_COLUMNIST: {
      data.content = $('div.post-content').children('p').text()
      data.updatedAt = $('span.date-modified time[datetime]').attr('datetime') ?? ''
      data.htmlContent = $('div.post-content').children('p').toString()
      break
    }
    case HOSTNAME.BLOCKONOMI: {
      data.content = $('div.post-content').children('p').text()
      data.htmlContent = $('div.post-content').children('p').toString()
      break
    }
    case HOSTNAME.COIN_DESK: {
      data.content = $('.at-body p').text().trim()
      data.description = $('.at-subheadline h2').text().trim()
      data.updatedAt = $('.at-updated span').text().trim()
      data.htmlContent = $('.at-body p').toString()
      break
    }
    case HOSTNAME.COIN_SPEAKER: {
      data.content = $('div.content').children('p').text()
      data.description = $('div.content_excerpt p').text().trim()
      data.htmlContent = $('div.content').children('p').toString()
      break
    }
    case HOSTNAME.COIN_TELEGRAPH: {
      data.content = $('.post-content').children('p').text()
      data.description = $('p.post__lead').text().trim()
      data.htmlContent = $('.post-content').children('p').toString()
      break
    }
    case HOSTNAME.CRYPTO_NEWSZ: {
      data.content = $('div.entry-content').children('p').text()
      data.htmlContent = $('div.entry-content').children('p').toString()
      break
    }
    case HOSTNAME.CRYPTO_POTATO: {
      data.author = $('.entry-user a').text().trim()
      data.content = $('div.coincodex-content').children('p').text()
      data.createdAt = $('.entry-date span.last-modified-timestamp').text().trim()
      data.htmlContent = $('div.coincodex-content').children('p').toString()

      if (data.createdAt) data.createdAt = data.createdAt.replace('@', '')
      break
    }
    case HOSTNAME.CRYPTO_SLATE: {
      data.content = $('article.full-article').children('p').text()
      data.htmlContent = $('article.full-article').children('p').toString()
      break
    }
    case HOSTNAME.DAILY_COIN: {
      data.content = $('div.mkd-post-text-inner').children('p').text()
      data.htmlContent = $('div.mkd-post-text-inner').children('p').toString()
      break
    }
    case HOSTNAME.NFT_EVENING: {
      data.content = $('div.post-content').children('p').text()
      data.htmlContent = $('div.post-content').children('p').toString()
      break
    }
    case HOSTNAME.NFT_PLAZAS: {
      data.content = $('div.entry-content').children('p').text()
      data.htmlContent = $('div.entry-content').children('p').toString()
      break
    }
  }

  if (data?.title && data?.content) await saveDataset(url.host, data)
})

async function saveDataset(
  hostname: string,
  { url, origin, author, title, description, content, createdAt, updatedAt, htmlContent }: Article
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
    createdAt: new Date(createdAt).toISOString(),
    updatedAt,
    htmlContent,
  })
}

let routes = [...coinTelegraphRoute, ...coinDeskRoute]

routes.forEach(route => {
  router.addHandler(route.label, route.handler)
})
