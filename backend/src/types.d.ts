import {
  EnumUserStatus,
  EnumConnectionStatus,
  EnumItemCondition,
  EnumItemVisibility,
  EnumShareRequestStatus,
  EnumShareRequestDirection,
  EnumShareTransactionStatus,
  EnumConditionOnReturn,
  EnumReminderType,
  EnumReminderChannel,
  EnumReminderStatus,
  EnumGuestUserStatus,
} from '../types-and-enums/enums'

// ─── Users ───────────────────────────────────────────────────────────────────

export interface IUser {
  id: string                  // UUID
  email: string
  displayName: string
  avatarUrl: string | null
  bio: string | null
  phone: string | null
  isEmailVerified: boolean
  status: EnumUserStatus
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

// ─── Social Accounts ─────────────────────────────────────────────────────────

export interface ISocialAccount {
  id: string
  userId: string
  provider: string
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
  id: string
  ownerId: string
  categoryId: string
  name: string
  description: string | null
  condition: EnumItemCondition
  isAvailable: boolean
  visibility: EnumItemVisibility
  estimatedValue: number | null
  notes: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

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
