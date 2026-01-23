import { createTableBrand } from './brands'
import { createTableProduct } from './products'

export const ensureTableExists = async () => {
  await createTableBrand()
  await createTableProduct()
}
