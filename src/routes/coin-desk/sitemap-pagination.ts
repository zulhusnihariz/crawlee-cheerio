import { FULL_DOMAIN, COIN_DESK } from '../../lib/enums/domain.enum.js'
import { RouteHandler } from '..'

const handler: RouteHandler = {
  label: COIN_DESK.SITEMAP_PAGINATION,
  handler: async ({ enqueueLinks, log, request }) => {
    log.info(`enqueueing: ${request.url}`)
    await enqueueLinks({
      globs: [`${FULL_DOMAIN.COIN_DESK}/markets/**`],
      selector: 'div.text-columns a',
      label: COIN_DESK.MARKETS,
    })
  },
}

export default handler
