import { RouteHandler } from '..'
import { FULL_DOMAIN, NFT_EVENING } from '../../lib/enums/domain.enum.js'

const handler: RouteHandler = {
  label: NFT_EVENING.PAGINATION,
  handler: async ({ enqueueLinks }) => {
    await enqueueLinks({
      globs: [`${FULL_DOMAIN.NFT_EVENING}/**`],
      selector: 'div.main-content a',
      label: NFT_EVENING.NEWS,
    })
  },
}

export default handler
