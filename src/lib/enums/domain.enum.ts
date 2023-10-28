export enum HOSTNAME {
  COIN_TELEGRAPH = 'cointelegraph.com',
  COIN_DESK = 'www.coindesk.com',
  NFT_EVENING = 'nftevening.com',
  NFT_LATELY = 'nftlately.com',
  BIT_COLUMNIST = 'bitcolumnist.com',
}

export enum FULL_DOMAIN {
  COIN_TELEGRAPH = `https://${HOSTNAME.COIN_TELEGRAPH}`,
  COIN_DESK = `https://${HOSTNAME.COIN_DESK}`,
  NFT_EVENING = `https://${HOSTNAME.NFT_EVENING}`,
  NFT_LATELY = `https://${HOSTNAME.NFT_LATELY}`,
  BIT_COLUMNIST = `https://${HOSTNAME.BIT_COLUMNIST}`,
}

export enum RSS_FEED {
  COIN_DESK = `${FULL_DOMAIN.COIN_DESK}/arc/outboundfeeds/rss/`,
  NFT_EVENING = `${FULL_DOMAIN.NFT_EVENING}/feed`,
  NFT_LATELY = `${FULL_DOMAIN.NFT_LATELY}/category/news/feed/`,
  BIT_COLUMNIST = `${FULL_DOMAIN.BIT_COLUMNIST}/feed`,
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
