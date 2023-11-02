import { Dataset } from 'crawlee'
import { RouteHandler } from '..'
import { HOSTNAME, COIN_TELEGRAPH } from '../../lib/enums/domain.enum.js'

const handler: RouteHandler = {
  label: COIN_TELEGRAPH.NEWS,
  handler: async ({ $, log, request }) => {
    log.info(`enqueueing: ${request.url}`)

    const url = new URL(request.url)

    const author = $('div.post-meta__author-name').text().trim()
    const title = $('article h1').text().trim()
    const description = $('p.post__lead').text().trim()
    const content = $('.post-content').children('p').text()
    const createdAt = $('.post-meta__publish-date time[datetime]').attr('datetime')

    if (title && content) {
      const dataset = await Dataset.open(HOSTNAME.COIN_TELEGRAPH)

      await dataset.pushData({
        url: request.loadedUrl,
        origin: url.host,
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
