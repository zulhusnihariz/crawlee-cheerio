import { Dataset, KeyValueStore } from 'crawlee'
import { HOSTNAME } from './lib/enums/domain.enum.js'

const hostNames = Object.values(HOSTNAME)

for (let i = 0; i < hostNames.length; i++) {
  const hostName = hostNames[i]
  const dataset = await Dataset.open(hostName)
  await KeyValueStore.setValue(hostName, (await dataset.getData()).items)
}
