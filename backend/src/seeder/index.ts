import { createTableUser } from './users'
import { createTableSocialAccount } from './social-accounts'
import { createTableConnection } from './connections'
import { createTableCategory } from './categories'
import { createTableUserCategoryPreference } from './user-category-preferences'
import { createTableItem } from './items'
import { createTableItemImage } from './item-images'
import { createTableGuestUser } from './guest-users'
import { createTableShareRequest } from './share-requests'
import { createTableShareTransaction } from './share-transactions'
import { createTableReminder } from './reminders'
import { createTableNotification } from './notifications'

export const ensureTableExists = async () => {
  // Users & auth (must be first — others reference users)
  await createTableUser()
  await createTableSocialAccount()

  // Community
  await createTableConnection()

  // Items & categories
  await createTableCategory()
  await createTableUserCategoryPreference()
  await createTableItem()
  await createTableItemImage()

  // Sharing lifecycle (guest_users before share_requests/transactions)
  await createTableGuestUser()
  await createTableShareRequest()
  await createTableShareTransaction()

  // Supporting tables
  await createTableReminder()
  await createTableNotification()
}
