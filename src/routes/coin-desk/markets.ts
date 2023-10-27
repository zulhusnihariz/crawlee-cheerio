import { Dataset } from 'crawlee'
import { DOMAIN, COIN_DESK } from '../../lib/enums/domain.enum.js'
import { RouteHandler } from '..'

const handler: RouteHandler = {
  label: COIN_DESK.MARKETS,
  handler: async ({ $, log, request }) => {
    log.info(`enqueueing: ${request.url}`)
    const author = $('div.at-authors a').text().trim()
    const title = $('.at-headline h1').text().trim()
    const description = $('.at-subheadline h2').text().trim()
    const content = $('.at-body p').text().trim()
    const createdAt = $('.at-created div span').text().trim()
    const updatedAt = $('.at-updated span').text().trim()

    if (title && content) {
      const dataset = await Dataset.open(DOMAIN.COIN_DESK)

      await dataset.pushData({
        url: request.loadedUrl,
        author,
        title,
        description,
        content,
        createdAt,
        updatedAt,
      })
    }
  },
}

export default handler
