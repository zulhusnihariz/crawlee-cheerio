import { CheerioCrawlingContext, Request, createCheerioRouter } from 'crawlee'
import { DOMAIN, FULL_DOMAIN, COIN_TELEGRAPH, COIN_DESK, NFT_NOW, NFT_EVENING } from '../lib/enums/domain.enum.js'
import coinTelegraphRoute from './coin-telegraph/index.js'
import coinDeskRoute from './coin-desk/index.js'
import nftEveningRoute from './nft-evening/index.js'

export type RouteHandler = {
  label: any
  handler: (
    ctx: Omit<CheerioCrawlingContext<any, any>, 'request'> & {
      request: Request<any>
    }
  ) => void
}

export const router = createCheerioRouter()

router.addDefaultHandler(async ({ $, enqueueLinks, log, request }) => {
  const url = new URL(request.url)

  switch (url.host) {
    case DOMAIN.COIN_TELEGRAPH: {
      await enqueueLinks({
        globs: [`${FULL_DOMAIN.COIN_TELEGRAPH}/news/**`],
        label: COIN_TELEGRAPH.NEWS,
      })
      break
    }
    case DOMAIN.COIN_DESK: {
      const maxPage = $('.page-item--break + li a').text().trim()

      let sitemaps = Array.from({ length: parseInt(maxPage) }, (_, i) => i + 1).map(el => {
        return `${FULL_DOMAIN.COIN_DESK}/sitemap/${el}`
      })

      await enqueueLinks({
        urls: sitemaps,
        label: COIN_DESK.SITEMAP_PAGINATION,
      })
      break
    }
    case DOMAIN.NFT_NOW: {
      await enqueueLinks({
        urls: [`${FULL_DOMAIN.NFT_NOW}/news/**`],
        label: NFT_NOW.NEWS,
      })
      break
    }
    case DOMAIN.NFT_EVENING: {
      //const maxPage = $('span.page-numbers.dot + a.page-numbers').text().trim()
      const tt = $('span.page-numbers.dot').text().trim()
      //console.log(maxPage, tt)

      const maxPage = '540'

      let paginations = Array.from({ length: parseInt(maxPage) }, (_, i) => i + 2).map(el => {
        return `${FULL_DOMAIN.NFT_EVENING}/news/page/${el}`
      })

      console.log(paginations)

      await enqueueLinks({
        urls: paginations,
        label: NFT_EVENING.PAGINATION,
      })
      break
    }
  }
})

let routes = [...coinTelegraphRoute, ...coinDeskRoute, ...nftEveningRoute]

routes.forEach(route => {
  router.addHandler(route.label, route.handler)
})
