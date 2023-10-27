import { Dataset, KeyValueStore } from 'crawlee'
import { DOMAIN } from './lib/enums/domain.enum.js'

const domains = Object.values(DOMAIN)

for (let i = 0; i < domains.length; i++) {
  const domain = domains[i]
  const dataset = await Dataset.open(domain)
  await KeyValueStore.setValue(domain, (await dataset.getData()).items)
}
