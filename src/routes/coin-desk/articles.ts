import { Dataset } from 'crawlee'
import { HOSTNAME, COIN_DESK } from '../../lib/enums/domain.enum.js'
import { RouteHandler } from '../index.js'

const handler: RouteHandler = {
  label: COIN_DESK.ARTICLES,
  handler: async ({ $, log, request }) => {
    log.info(`enqueueing: ${request.url}`)
    const url = new URL(request.url)
    const origin = url.host
    const author = $('div.at-authors a').text().trim()
    const title = $('.at-headline h1').text().trim()
    const description = $('.at-subheadline h2').text().trim()
    const content = $('.at-body p').text().trim()
    const createdAt = $('.at-created div span').text().trim()
    const updatedAt = $('.at-updated span').text().trim()

    if (title && content) {
      const dataset = await Dataset.open(HOSTNAME.COIN_DESK)

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
  },
}

export default handler
