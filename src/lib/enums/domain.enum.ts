export enum HOSTNAME {
  AMBCRYPTO = 'ambcrypto.com',
  BEINCRYPTO = 'beincrypto.com',
  BIT_COLUMNIST = 'bitcolumnist.com',
  BLOCKONOMI = 'blockonomi.com',
  COIN_DESK = 'www.coindesk.com',
  COIN_SPEAKER = 'www.coinspeaker.com',
  COIN_TELEGRAPH = 'cointelegraph.com',
  CRYPTO_NEWSZ = 'www.cryptonewsz.com',
  CRYPTO_POTATO = 'cryptopotato.com',
  CRYPTO_SLATE = 'cryptoslate.com',
  DAILY_COIN = 'dailycoin.com',
  NFT_EVENING = 'nftevening.com',
  NFT_PLAZAS = 'nftplazas.com',
}

export enum FULL_DOMAIN {
  AMBCRYPTO = `https://${HOSTNAME.AMBCRYPTO}`,
  BEINCRYPTO = `https://${HOSTNAME.BEINCRYPTO}`,
  BIT_COLUMNIST = `https://${HOSTNAME.BIT_COLUMNIST}`,
  BLOCKONOMI = `https://${HOSTNAME.BLOCKONOMI}`,
  COIN_DESK = `https://${HOSTNAME.COIN_DESK}`,
  COIN_SPEAKER = `https://${HOSTNAME.COIN_SPEAKER}`,
  COIN_TELEGRAPH = `https://${HOSTNAME.COIN_TELEGRAPH}`,
  CRYPTO_NEWSZ = `https://${HOSTNAME.CRYPTO_NEWSZ}`,
  CRYPTO_POTATO = `https://${HOSTNAME.CRYPTO_POTATO}`,
  CRYPTO_SLATE = `https://${HOSTNAME.CRYPTO_SLATE}`,
  DAILY_COIN = `https://${HOSTNAME.DAILY_COIN}`,
  NFT_EVENING = `https://${HOSTNAME.NFT_EVENING}`,
  NFT_PLAZAS = `https://${HOSTNAME.NFT_PLAZAS}`,
}

export enum RSS_FEED {
  AMBCRYPTO = `${FULL_DOMAIN.AMBCRYPTO}/rss`,
  BEINCRYPTO = `${FULL_DOMAIN.BEINCRYPTO}/rss`,
  BIT_COLUMNIST = `${FULL_DOMAIN.BIT_COLUMNIST}/feed`,
  BLOCKONOMI = `${FULL_DOMAIN.BLOCKONOMI}/rss`,
  COIN_DESK = `${FULL_DOMAIN.COIN_DESK}/arc/outboundfeeds/rss/`,
  COIN_SPEAKER = `${FULL_DOMAIN.COIN_SPEAKER}/rss`,
  COIN_TELEGRAPH = `${FULL_DOMAIN.COIN_TELEGRAPH}/rss`,
  CRYPTO_NEWSZ = `${FULL_DOMAIN.CRYPTO_NEWSZ}/rss`,
  CRYPTO_POTATO = `${FULL_DOMAIN.CRYPTO_POTATO}/rss`,
  CRYPTO_SLATE = `${FULL_DOMAIN.CRYPTO_SLATE}/rss`,
  DAILY_COIN = `${FULL_DOMAIN.DAILY_COIN}/rss`,
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
