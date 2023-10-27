import { Dataset } from 'crawlee'
import { RouteHandler } from '..'
import { DOMAIN, NFT_NOW } from '../../lib/enums/domain.enum.js'

const handler: RouteHandler = {
  label: NFT_NOW.NEWS,
  handler: async ({ $, log, request }) => {
    log.info(`enqueueing: ${request.url}`)

    const author = $('div.single__meta--left p strong').text().trim()
    const title = $('h1.single__intro--title').text().trim()
    const description = ''
    const content = $('section.single__content div').children('p').text()
    const createdAt = $('div.single__meta--date p strong').text().trim()

    if (title && content) {
      const dataset = await Dataset.open(DOMAIN.COIN_TELEGRAPH)

      await dataset.pushData({
        url: request.loadedUrl,
        author,
        title,
        description,
        content,
        createdAt,
        updatedAt: '',
      })
    }
  },
}

export default handler
