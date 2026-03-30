import { createTableCategory } from './categories'
import { createTableItem } from './items'
import { createTableSharing } from './sharings'
import { createTableSocialAccount } from './social-accounts'
import { createTableUserContact } from './user-contacts'
import { createTableUser } from './users'

export const ensureTableExists = async () => {
  // Users & auth (must be first — others reference users)
  await createTableUser()

  await createTableSocialAccount()

  // Community
  // await createTableConnection()

  // Items & categories
  await createTableCategory()
  // await createTableUserCategoryPreference()
  await createTableItem()
  // await createTableItemImage()

  await createTableSharing()

  await createTableUserContact()

  // Sharing lifecycle (guest_users before share_requests/transactions)
  // await createTableShareRequest()
  // await createTableShareTransaction()

  // Supporting tables
  // await createTableReminder()
  // await createTableNotification()
}
