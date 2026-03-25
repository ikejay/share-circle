export enum EnumLoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  INITIAL = 'INITIAL',
  ERROR = 'ERROR',
}

export enum EnumUserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DEACTIVATED = 'deactivated',
}

export enum EnumConnectionStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  BLOCKED = 'blocked',
}

export enum EnumItemCondition {
  NEW = 'new',
  LIKE_NEW = 'like_new',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
}

export enum EnumItemVisibility {
  CONNECTIONS = 'connections',
  PRIVATE = 'private',
}

export enum EnumShareRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum EnumShareRequestDirection {
  BORROW = 'borrow',
  OFFER = 'offer',
}

export enum EnumShareTransactionStatus {
  ACTIVE = 'active',
  OVERDUE = 'overdue',
  RETURN_REQUESTED = 'return_requested',
  COMPLETED = 'completed',
  DISPUTED = 'disputed',
}

export enum EnumConditionOnReturn {
  AS_EXPECTED = 'as_expected',
  MINOR_DAMAGE = 'minor_damage',
  MAJOR_DAMAGE = 'major_damage',
  LOST = 'lost',
}

export enum EnumReminderType {
  RETURN_NUDGE = 'return_nudge',
  OVERDUE_ALERT = 'overdue_alert',
  CUSTOM = 'custom',
}

export enum EnumReminderChannel {
  EMAIL = 'email',
  IN_APP = 'in_app',
  SMS = 'sms',
}

export enum EnumReminderStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum EnumGuestUserStatus {
  INVITED = 'invited',
  ACCEPTED_SHARE = 'accepted_share',
  SIGNED_UP = 'signed_up',
  EXPIRED = 'expired',
}
