import { CheerioCrawlingContext, Dataset, Request, createCheerioRouter } from 'crawlee'
import { HOSTNAME, FULL_DOMAIN, COIN_DESK, RSS_FEED } from '../lib/enums/domain.enum.js'
import coinTelegraphRoute from './coin-telegraph/index.js'
import coinDeskRoute from './coin-desk/index.js'

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
    case HOSTNAME.NFT_EVENING:
      {
        log.info(`enqueueing: ${request.url}`)

        const url = new URL(request.url)

        const origin = url.host
        const author = $('span.post-author a').text().trim()
        const title = $('h1.post-title').text().trim()
        const description = ''
        const content = $('div.post-content').children('p').text()
        const createdAt = $('span.date time[datetime]').attr('datetime')

        if (title && content) {
          const dataset = await Dataset.open(HOSTNAME.NFT_EVENING)

          await dataset.pushData({
            url: request.loadedUrl,
            origin,
            author,
            title,
            description,
            content,
            createdAt,
            updatedAt: '',
          })
        }
      }
      break
    case HOSTNAME.BIT_COLUMNIST: {
      log.info(`enqueueing: ${request.url}`)

      const url = new URL(request.url)

      const origin = url.host
      const author = $('span.post-author a').text().trim()
      const title = $('h1.post-title').text().trim()
      const description = ''
      const content = $('div.post-content').children('p').text()
      const createdAt = $('span.date time[datetime]').attr('datetime')
      const updatedAt = $('span.date-modified time[datetime]').attr('datetime')

      console.log(title, content)

      if (title && content) {
        const dataset = await Dataset.open(HOSTNAME.NFT_LATELY)

        await dataset.pushData({
          url: request.loadedUrl,
          origin,
          author,
          title,
          description,
          content,
          createdAt,
          updatedAt,
        })
      }
      break
    }
  }
})

let routes = [...coinTelegraphRoute, ...coinDeskRoute]

routes.forEach(route => {
  router.addHandler(route.label, route.handler)
})
