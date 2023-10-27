export enum DOMAIN {
  COIN_TELEGRAPH = 'cointelegraph.com',
  COIN_DESK = 'www.coindesk.com',
  NFT_NOW = 'nftnow.com',
  NFT_EVENING = 'nftevening.com',
}

export enum FULL_DOMAIN {
  COIN_TELEGRAPH = `https://${DOMAIN.COIN_TELEGRAPH}`,
  COIN_DESK = `https://${DOMAIN.COIN_DESK}`,
  NFT_NOW = `https://${DOMAIN.NFT_NOW}`,
  NFT_EVENING = `https://${DOMAIN.NFT_EVENING}`,
}

export enum COIN_TELEGRAPH {
  NEWS = 'ct-news',
}

export enum COIN_DESK {
  MARKETS = 'cd-markets',
  SITEMAP_PAGINATION = 'cd-sitemap-pagination',
}

export enum NFT_NOW {
  NEWS = 'nn-news',
}

export enum NFT_EVENING {
  NEWS = 'ne-news',
  PAGINATION = 'ne-pagination',
}
