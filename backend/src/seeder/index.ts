import { createTableBrand } from './brands'
import { createTableIdentityProviders } from './identity-providers'
import { createTablePermission } from './permissions'
import { createTableProduct } from './products'
import { createTableUserPermission } from './user-permissions'
import { createTableUser } from './users'

export const ensureTableExists = async () => {
  await createTableBrand()
  await createTableProduct()
  await createTableIdentityProviders()
  await createTablePermission()
  await createTableUserPermission()
  await createTableUser()
}
