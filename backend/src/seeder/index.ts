import { createTableProduct } from './products/index.js'

export const ensureTableExists = async () => {
  await createTableProduct()
}

