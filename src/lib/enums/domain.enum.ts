export enum HOSTNAME {
  BIT_COLUMNIST = 'bitcolumnist.com',
  COIN_TELEGRAPH = 'cointelegraph.com',
  COIN_DESK = 'www.coindesk.com',
  CRYPTO_POTATO = 'cryptopotato.com',
  NFT_EVENING = 'nftevening.com',
  NFT_PLAZAS = 'nftplazas.com',
}

export enum FULL_DOMAIN {
  BIT_COLUMNIST = `https://${HOSTNAME.BIT_COLUMNIST}`,
  COIN_TELEGRAPH = `https://${HOSTNAME.COIN_TELEGRAPH}`,
  COIN_DESK = `https://${HOSTNAME.COIN_DESK}`,
  CRYPTO_POTATO = `https://${HOSTNAME.CRYPTO_POTATO}`,
  NFT_EVENING = `https://${HOSTNAME.NFT_EVENING}`,
  NFT_PLAZAS = `https://${HOSTNAME.NFT_PLAZAS}`,
}

export enum RSS_FEED {
  BIT_COLUMNIST = `${FULL_DOMAIN.BIT_COLUMNIST}/feed`,
  COIN_DESK = `${FULL_DOMAIN.COIN_DESK}/arc/outboundfeeds/rss/`,
  CRYPTO_POTATO = `${FULL_DOMAIN.CRYPTO_POTATO}/rss`,
  NFT_EVENING = `${FULL_DOMAIN.NFT_EVENING}/feed`,
  NFT_PLAZAS = `${FULL_DOMAIN.NFT_PLAZAS}/feed`,
}

export enum COIN_TELEGRAPH {
  NEWS = 'ct-news',
}

export enum COIN_DESK {
  ARTICLES = 'cd-articles',
  BUSINESS = 'cd-business',
  TECH = 'cd-tech',
  MARKETS = 'cd-markets',
  SITEMAP_PAGINATION = 'cd-sitemap-pagination',
}

export enum NFT_EVENING {
  NEWS = 'ne-news',
  PAGINATION = 'ne-pagination',
}

export enum NFT_LATELY {
  NEWS = 'nl-news',
}
