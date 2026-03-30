import {
  EnumConditionOnReturn,
  EnumConnectionStatus,
  EnumContactType,
  EnumGuestUserStatus,
  EnumidentityProvider,
  EnumItemCondition,
  EnumReminderChannel,
  EnumReminderStatus,
  EnumReminderType,
  EnumShareRequestDirection,
  EnumShareRequestStatus,
  EnumShareTransactionStatus,
  EnumUserStatus,
} from '../types-and-enums/enums'

// ─── User contact ───────────────────────────────────────────────────────────────────

export interface IUserContact {
  id: number
  userId: number
  type: EnumContactType
  value: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type tNewContact = Omit<IUserContact, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

// ─── Users ───────────────────────────────────────────────────────────────────

export interface IUser {
  id: number
  externalId: string
  displayName: string
  status: EnumUserStatus
  contacts: IUserContatct[]
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type tNewUser = Omit<IUser, 'id' | 'externalId' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'lastLoginAt'>

// ─── Sharings ─────────────────────────────────────────────────────────

export interface ISharing {
  id: string
  itemId: string
  issuerId: string
  recipientId: string
  issueDate: string
  plannedReturnDate: string
  createdAt: Date
  deletedAt: Date
  updatedAt: Date
}


export type tNewSharing = Omit<Isharing, 'id' | 'externalId' | 'createdAt' | 'updatedAt' | 'deletedAt' >

// ─── Social Accounts ─────────────────────────────────────────────────────────

export interface ISocialAccount {
  id: number
  userId: number
  provider: EnumidentityProvider
  providerUid: string
  accessToken: string | null
  refreshToken: string | null
  tokenExpiresAt: string | null
  createdAt: string
  updatedAt: string
}

// ─── Connections ─────────────────────────────────────────────────────────────

export interface IConnection {
  id: string
  requesterId: string
  addresseeId: string
  status: EnumConnectionStatus
  requestedAt: string
  respondedAt: string | null
  createdAt: string
  updatedAt: string
}

// ─── Categories ──────────────────────────────────────────────────────────────

export interface ICategory {
  id: string
  externalId: string
  name: string
  description: string | null
  iconUrl: string | null
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── User Category Preferences ───────────────────────────────────────────────

export interface IUserCategoryPreference {
  userId: string
  categoryId: string
  createdAt: string
}

// ─── Items ───────────────────────────────────────────────────────────────────

export interface IItem {
  id: number
  externalId: string
  ownerId: number
  categoryId: number
  name: string
  description: string | null
  condition: EnumItemCondition
  notes: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type tNewItem = Omit<IItem, 'id' | 'externalId' | 'createdAt' | 'updatedAt' | 'deletedAt'>

// ─── Item Images ─────────────────────────────────────────────────────────────

export interface IItemImage {
  id: string
  itemId: string
  url: string
  isPrimary: boolean
  sortOrder: number
  uploadedAt: string
}

// ─── Share Requests ───────────────────────────────────────────────────────────

export interface IShareRequest {
  id: string
  itemId: string
  requesterId: string | null
  recipientUserId: string | null
  recipientGuestId: string | null
  direction: EnumShareRequestDirection
  status: EnumShareRequestStatus
  message: string | null
  proposedStartDate: string | null
  proposedEndDate: string | null
  respondedAt: string | null
  expiresAt: string | null
  createdAt: string
  updatedAt: string
}

// ─── Share Transactions ───────────────────────────────────────────────────────

export interface IShareTransaction {
  id: string
  requestId: string
  itemId: string
  lenderId: string
  borrowerUserId: string | null
  borrowerGuestId: string | null
  status: EnumShareTransactionStatus
  startDate: string
  expectedReturnDate: string
  actualReturnDate: string | null
  lenderNotes: string | null
  borrowerNotes: string | null
  conditionOnReturn: EnumConditionOnReturn | null
  createdAt: string
  updatedAt: string
}

// ─── Reminders ───────────────────────────────────────────────────────────────

export interface IReminder {
  id: string
  transactionId: string
  createdBy: string
  reminderType: EnumReminderType
  message: string | null
  channel: EnumReminderChannel
  scheduledFor: string
  sentAt: string | null
  status: EnumReminderStatus
  createdAt: string
  updatedAt: string
}

// ─── Guest Users ─────────────────────────────────────────────────────────────

export interface IGuestUser {
  id: string
  email: string
  name: string | null
  inviteToken: string
  tokenExpiresAt: string
  invitedBy: string
  status: EnumGuestUserStatus
  convertedUserId: string | null
  convertedAt: string | null
  lastEmailSentAt: string | null
  createdAt: string
  updatedAt: string
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface INotification {
  id: string
  userId: string
  type: string
  title: string
  body: string | null
  isRead: boolean
  referenceType: string | null
  referenceId: string | null
  createdAt: string
}

// ─── Paging ──────────────────────────────────────────────────────────────────

export interface IPaging {
  page: number
  itemsPerPage: number
}

export interface IPagedResponse<T> {
  list: T[]
  totalCount: number
  paging: IPaging
}
