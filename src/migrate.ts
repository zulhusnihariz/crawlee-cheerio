import { Dataset } from 'crawlee'
import { addColumn, postData } from './database/sqlite'
import { HOSTNAME } from './lib/enums/domain.enum'

async function init() {
  let datas: any[] = []

  for (let i = 0, hostNames = Object.values(HOSTNAME); i < hostNames.length; i++) {
    const hostName = hostNames[i]
    let dataset = await Dataset.open(hostName)
    const items = (await dataset.getData()).items

    datas = datas.concat(items.map(el => Object.values(el)))
  }

  await addColumn('htmlContent')
  await postData(datas)
}

init()
