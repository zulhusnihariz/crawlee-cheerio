import { Dataset } from 'crawlee'
import { RouteHandler } from '..'
import { DOMAIN, NFT_EVENING, NFT_NOW } from '../../lib/enums/domain.enum.js'

const handler: RouteHandler = {
  label: NFT_EVENING.NEWS,
  handler: async ({ $, log, request }) => {
    log.info(`enqueueing: ${request.url}`)

    const author = $('span.post-author a').text().trim()
    const title = $('h1.post-title').text().trim()
    const description = ''
    const content = $('div.post-content').children('p').text()
    const createdAt = $('span.date time[datetime]').attr('datetime')

    if (title && content) {
      const dataset = await Dataset.open(DOMAIN.NFT_EVENING)

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
