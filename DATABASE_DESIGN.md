# Database Design — Item Sharing Platform (MVP)

> **Platform concept:** A community-driven platform where users lend and borrow physical items within trusted circles, with support for non-registered users via email invitations.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Entity Overview](#2-entity-overview)
3. [Schema](#3-schema)
    - [Users & Auth](#31-users--auth)
    - [Connections (Community)](#32-connections-community)
    - [Items & Categories](#33-items--categories)
    - [Sharing & Requests](#34-sharing--requests)
    - [Reminders](#35-reminders)
    - [Guest Users (Non-Registered)](#36-guest-users-non-registered)
    - [Notifications](#37-notifications)
4. [Entity Relationship Diagram (ERD)](#4-entity-relationship-diagram-erd)
5. [Key Relationships Summary](#5-key-relationships-summary)
6. [Suggested Indexes](#6-suggested-indexes)
7. [MVP Suggestions & Enhancements](#7-mvp-suggestions--enhancements)
8. [Future Considerations](#8-future-considerations)

---

## 1. Design Principles

- **Soft deletes** on all major tables (`deleted_at`) to preserve sharing history.
- **UUID primary keys** across all tables for security and distributed-system compatibility.
- **Audit timestamps** (`created_at`, `updated_at`) on every table.
- **Enum-driven status fields** to keep state transitions explicit and queryable.
- **Guest-first design** — non-registered users are first-class citizens tracked via email until they convert to full accounts.
- **Connection-gated sharing** — items can only be shared with connected users or invited guests.

---

## 2. Entity Overview

| Entity | Description |
|---|---|
| `users` | Registered users of the platform |
| `social_accounts` | OAuth provider links per user |
| `connections` | Friendship/community links between users |
| `categories` | Global list of item categories (e.g., Tools, Books) |
| `user_category_preferences` | Categories a user is interested in sharing |
| `items` | Physical items a user owns and can share |
| `item_images` | One or more photos per item |
| `share_requests` | A request to borrow or lend an item |
| `share_transactions` | Active or completed sharing records |
| `reminders` | Return reminders tied to a transaction |
| `guest_users` | Unregistered users invited via email |
| `notifications` | In-app notification log |

---

## 3. Schema

### 3.1 Users & Auth

#### `users`

Stores all registered users, whether they signed up via email/password or a social login.

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           VARCHAR(255) UNIQUE NOT NULL,
  display_name    VARCHAR(100) NOT NULL,
  avatar_url      TEXT,
  bio             TEXT,
  phone           VARCHAR(30),                          -- optional, for SMS reminders
  is_email_verified BOOLEAN NOT NULL DEFAULT false,
  status          VARCHAR(20) NOT NULL DEFAULT 'active' -- active | suspended | deactivated
    CHECK (status IN ('active', 'suspended', 'deactivated')),
  last_login_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ                            -- soft delete
);
```

#### `social_accounts`

Links a user to one or more OAuth providers (Google, Facebook, Apple, etc.). A user can have multiple social logins tied to the same `users` record.

```sql
CREATE TABLE social_accounts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider        VARCHAR(50) NOT NULL,                 -- google | facebook | apple | github
  provider_uid    VARCHAR(255) NOT NULL,                -- the ID from the OAuth provider
  access_token    TEXT,                                 -- encrypted; refresh on login
  refresh_token   TEXT,                                 -- encrypted
  token_expires_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, provider_uid)
);
```

> **Note:** For email/password registration, store a hashed password directly on `users` (e.g., `password_hash VARCHAR(255)`) or use a dedicated `user_credentials` table if you want a clean separation between auth methods.

---

### 3.2 Connections (Community)

A connection is a **bidirectional** relationship between two users. The direction of the request is stored (`requester_id` → `addressee_id`) but once accepted, both users can share with each other.

#### `connections`

```sql
CREATE TABLE connections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  addressee_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status          VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  requested_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  responded_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT no_self_connect CHECK (requester_id <> addressee_id),
  CONSTRAINT unique_connection UNIQUE (
    LEAST(requester_id::TEXT, addressee_id::TEXT),
    GREATEST(requester_id::TEXT, addressee_id::TEXT)
  )
);
```

> **Design note:** The `LEAST`/`GREATEST` unique constraint ensures you can't have both (A→B) and (B→A) as separate rows. A single row represents the relationship regardless of who initiated it.

---

### 3.3 Items & Categories

#### `categories`

A global, admin-managed list of item categories. Users pick from this list when adding items or setting preferences.

```sql
CREATE TABLE categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(100) UNIQUE NOT NULL,          -- e.g. "Power Tools", "Books", "Sports Gear"
  description     TEXT,
  icon_url        TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### `user_category_preferences`

Records which categories a user is willing to share items from. Used for discovery/filtering.

```sql
CREATE TABLE user_category_preferences (
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id     UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, category_id)
);
```

#### `items`

Physical items a user owns and makes available for sharing.

```sql
CREATE TABLE items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id     UUID NOT NULL REFERENCES categories(id),
  name            VARCHAR(200) NOT NULL,
  description     TEXT,
  condition       VARCHAR(30) NOT NULL DEFAULT 'good'
    CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  is_available    BOOLEAN NOT NULL DEFAULT true,          -- false when currently shared out
  visibility      VARCHAR(20) NOT NULL DEFAULT 'connections'
    CHECK (visibility IN ('connections', 'private')),     -- future: 'public'
  estimated_value NUMERIC(10, 2),                         -- optional; useful for loss/damage tracking
  notes           TEXT,                                   -- private owner notes
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);
```

#### `item_images`

Supports multiple images per item, with one marked as the primary/cover image.

```sql
CREATE TABLE item_images (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id         UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  url             TEXT NOT NULL,
  is_primary      BOOLEAN NOT NULL DEFAULT false,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  uploaded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 3.4 Sharing & Requests

The sharing lifecycle has two stages:

1. **`share_requests`** — someone initiates a request to borrow an item.
2. **`share_transactions`** — the approved, active, or completed lending record.

#### `share_requests`

Handles both directions: the owner can offer an item to a connection, or a borrower can request one.

```sql
CREATE TABLE share_requests (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id             UUID NOT NULL REFERENCES items(id),
  requester_id        UUID REFERENCES users(id),          -- NULL if initiated by owner as an offer
  recipient_user_id   UUID REFERENCES users(id),          -- set if recipient is registered
  recipient_guest_id  UUID REFERENCES guest_users(id),    -- set if recipient is a guest (email only)
  direction           VARCHAR(10) NOT NULL
    CHECK (direction IN ('borrow', 'offer')),              -- 'borrow' = borrower requests; 'offer' = owner offers
  status              VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled', 'expired')),
  message             TEXT,
  proposed_start_date DATE,
  proposed_end_date   DATE,
  responded_at        TIMESTAMPTZ,
  expires_at          TIMESTAMPTZ,                        -- auto-expire unanswered requests
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT recipient_required CHECK (
    recipient_user_id IS NOT NULL OR recipient_guest_id IS NOT NULL
  ),
  CONSTRAINT not_same_requester_recipient CHECK (
    requester_id IS DISTINCT FROM recipient_user_id
  )
);
```

#### `share_transactions`

Created when a `share_request` is accepted. Tracks the full lifecycle of an active loan.

```sql
CREATE TABLE share_transactions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id          UUID UNIQUE NOT NULL REFERENCES share_requests(id),
  item_id             UUID NOT NULL REFERENCES items(id),
  lender_id           UUID NOT NULL REFERENCES users(id),
  borrower_user_id    UUID REFERENCES users(id),
  borrower_guest_id   UUID REFERENCES guest_users(id),
  status              VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'overdue', 'return_requested', 'completed', 'disputed')),
  start_date          DATE NOT NULL,
  expected_return_date DATE NOT NULL,
  actual_return_date  DATE,
  lender_notes        TEXT,
  borrower_notes      TEXT,
  condition_on_return VARCHAR(30)
    CHECK (condition_on_return IN ('as_expected', 'minor_damage', 'major_damage', 'lost')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT borrower_required CHECK (
    borrower_user_id IS NOT NULL OR borrower_guest_id IS NOT NULL
  )
);
```

---

### 3.5 Reminders

Reminders are scheduled messages sent by the lender to the borrower nudging them to return an item.

#### `reminders`

```sql
CREATE TABLE reminders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id      UUID NOT NULL REFERENCES share_transactions(id) ON DELETE CASCADE,
  created_by          UUID NOT NULL REFERENCES users(id),  -- always the lender
  reminder_type       VARCHAR(30) NOT NULL DEFAULT 'return_nudge'
    CHECK (reminder_type IN ('return_nudge', 'overdue_alert', 'custom')),
  message             TEXT,
  channel             VARCHAR(20) NOT NULL DEFAULT 'email'
    CHECK (channel IN ('email', 'in_app', 'sms')),         -- sms requires phone on borrower record
  scheduled_for       TIMESTAMPTZ NOT NULL,
  sent_at             TIMESTAMPTZ,
  status              VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 3.6 Guest Users (Non-Registered)

Guests are people who receive a sharing invite by email but haven't signed up yet. Their record captures just enough to send them the invite and track their response.

#### `guest_users`

```sql
CREATE TABLE guest_users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               VARCHAR(255) UNIQUE NOT NULL,
  name                VARCHAR(100),                        -- if provided by the inviting user
  invite_token        VARCHAR(255) UNIQUE NOT NULL,        -- signed token in the email link
  token_expires_at    TIMESTAMPTZ NOT NULL,
  invited_by          UUID NOT NULL REFERENCES users(id),  -- the user who shared with them
  status              VARCHAR(20) NOT NULL DEFAULT 'invited'
    CHECK (status IN ('invited', 'accepted_share', 'signed_up', 'expired')),
  converted_user_id   UUID REFERENCES users(id),           -- set when they register
  converted_at        TIMESTAMPTZ,
  last_email_sent_at  TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

> **Conversion flow:** When a guest signs up using the invite link, set `converted_user_id` and `status = 'signed_up'`. Migrate any open `share_requests` and `share_transactions` from `borrower_guest_id` to `borrower_user_id`. The `guest_users` row is retained for history.

---

### 3.7 Notifications

A lightweight, in-app notification log. Each significant event (connection request, share accepted, reminder, return request) writes a row here.

#### `notifications`

```sql
CREATE TABLE notifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type            VARCHAR(50) NOT NULL,
    -- e.g. connection_request | share_request | share_accepted | share_declined
    --      reminder_sent | return_requested | item_returned | guest_signed_up
  title           VARCHAR(200) NOT NULL,
  body            TEXT,
  is_read         BOOLEAN NOT NULL DEFAULT false,
  reference_type  VARCHAR(50),                             -- 'share_transaction' | 'connection' | etc.
  reference_id    UUID,                                    -- FK-like pointer (polymorphic)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 4. Entity Relationship Diagram (ERD)

```
┌─────────────────┐         ┌──────────────────────┐
│     users       │─────────┤   social_accounts    │
│─────────────────│  1:N    │──────────────────────│
│ id (PK)         │         │ id (PK)              │
│ email           │         │ user_id (FK)         │
│ display_name    │         │ provider             │
│ status          │         │ provider_uid         │
└────────┬────────┘         └──────────────────────┘
         │
         │ 1:N (requester/addressee)
         ▼
┌─────────────────┐
│   connections   │
│─────────────────│
│ id (PK)         │
│ requester_id(FK)│
│ addressee_id(FK)│
│ status          │
└─────────────────┘

┌─────────────────┐         ┌──────────────────────┐
│     users        │────────┤ user_category_prefs  │
│                 │  1:N    │──────────────────────│
│                 │         │ user_id (FK)         │
│                 │         │ category_id (FK)     │
└─────────────────┘         └───────────┬──────────┘
                                        │
                            ┌───────────▼──────────┐
                            │      categories      │
                            │──────────────────────│
                            │ id (PK)              │
                            │ name                 │
                            │ icon_url             │
                            └──────────────────────┘

┌─────────────────┐         ┌──────────────────────┐
│     users       │─────────┤       items          │
│  (owner_id)     │  1:N    │──────────────────────│
│                 │         │ id (PK)              │
│                 │         │ owner_id (FK)        │
└─────────────────┘         │ category_id (FK)     │
                            │ name                 │
                            │ is_available         │
                            └───────────┬──────────┘
                                        │ 1:N
                            ┌───────────▼──────────┐
                            │    item_images       │
                            │──────────────────────│
                            │ item_id (FK)         │
                            │ url                  │
                            │ is_primary           │
                            └──────────────────────┘

┌─────────────────┐         ┌──────────────────────┐
│   guest_users   │─────┐   │    share_requests    │
│─────────────────│     │   │──────────────────────│
│ id (PK)         │     └──▶│ recipient_guest_id   │
│ email           │         │ recipient_user_id    │
│ invite_token    │         │ requester_id (FK)    │
│ invited_by (FK) │         │ item_id (FK)         │
│ converted_user  │         │ status               │
└─────────────────┘         │ direction            │
                            └───────────┬──────────┘
                                        │ 1:1 (on accept)
                            ┌───────────▼───────────┐
                            │  share_transactions   │
                            │───────────────────────│
                            │ id (PK)               │
                            │ request_id (FK)       │
                            │ item_id (FK)          │
                            │ lender_id (FK)        │
                            │ borrower_user_id (FK) │
                            │ borrower_guest_id (FK)│
                            │ status                │
                            │ expected_return_date  │
                            └───────────┬───────────┘
                                        │ 1:N
                            ┌───────────▼───────────┐
                            │      reminders        │
                            │───────────────────────│
                            │ transaction_id (FK)   │
                            │ created_by (FK)       │
                            │ channel               │
                            │ scheduled_for         │
                            │ status                │
                            └───────────────────────┘
```

---

## 5. Key Relationships Summary

| Relationship | Cardinality | Notes |
|---|---|---|
| `users` → `social_accounts` | 1:N | One user, multiple OAuth providers |
| `users` ↔ `users` (via `connections`) | M:N | Bidirectional; stored as one row |
| `users` → `items` | 1:N | One user owns many items |
| `categories` ↔ `users` (via `user_category_preferences`) | M:N | Users select which categories they share |
| `items` → `item_images` | 1:N | One item, many photos |
| `share_requests` → `share_transactions` | 1:1 | A transaction is born from an accepted request |
| `share_transactions` → `reminders` | 1:N | Multiple reminders can be sent per loan |
| `guest_users` → `users` | N:1 (optional) | A guest may convert to a registered user |

---

## 6. Suggested Indexes

```sql
-- Fast lookups for a user's connections
CREATE INDEX idx_connections_requester ON connections(requester_id, status);
CREATE INDEX idx_connections_addressee ON connections(addressee_id, status);

-- User's items (dashboard)
CREATE INDEX idx_items_owner ON items(owner_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_items_category ON items(category_id) WHERE deleted_at IS NULL;

-- Share request inbox / outbox
CREATE INDEX idx_share_requests_recipient_user ON share_requests(recipient_user_id, status);
CREATE INDEX idx_share_requests_requester ON share_requests(requester_id, status);

-- Active transactions
CREATE INDEX idx_transactions_lender ON share_transactions(lender_id, status);
CREATE INDEX idx_transactions_borrower_user ON share_transactions(borrower_user_id, status);

-- Pending reminders for cron job
CREATE INDEX idx_reminders_scheduled ON reminders(scheduled_for, status)
  WHERE status = 'pending';

-- Guest lookup by token (for invite link resolution)
CREATE INDEX idx_guest_token ON guest_users(invite_token) WHERE status = 'invited';

-- Notification feed
CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC)
  WHERE is_read = false;
```

---

## 7. MVP Suggestions & Enhancements

These additions were not in the original spec but are low-effort, high-value for the MVP:

### ✅ Item Condition Tracking on Return
The `condition_on_return` field on `share_transactions` lets both parties note whether the item came back damaged. This seeds a future **dispute or loss resolution** flow without needing a separate table.

### ✅ Invite Token Expiry + Re-invite
The `token_expires_at` and `last_email_sent_at` fields on `guest_users` enable a "resend invite" feature — the app can check if the token has expired and issue a new one without creating a duplicate guest record.

### ✅ Share Request Expiry
`expires_at` on `share_requests` allows unanswered requests to auto-expire (via a cron job), keeping inboxes clean and items from being locked in limbo.

### ✅ Estimated Value on Items
`estimated_value` on `items` is optional but useful from day one — it enables a simple "this item is worth ~$X" display and seeds future loss/damage claim features.

### ✅ Notification Reference Polymorphism
`reference_type` + `reference_id` on `notifications` is a lightweight polymorphic pointer that lets you deep-link a notification to the relevant record (e.g., tap a notification → go to that transaction). Avoids a separate join table.

### ✅ SMS Channel on Reminders
The `channel` field on `reminders` supports SMS from day one (with `phone` on `users`). Even if you don't build it at launch, the schema won't need migrating later.

---

## 8. Future Considerations

These are **post-MVP** ideas that the current schema can accommodate with additive migrations:

| Feature | What to add |
|---|---|
| **Item reviews / ratings** | `item_reviews` table: `transaction_id`, `reviewer_id`, `rating`, `comment` |
| **Community / groups** | `communities` + `community_members` tables; items can be shared at the community level |
| **Wishlist / request board** | `item_requests` table: a user posts that they're looking for a specific category; connected users see it |
| **Waiting list** | `item_waitlist` table: if an item is out, users can queue for next availability |
| **Damage / dispute tracking** | `disputes` table linked to `share_transactions`; tracks resolution and communication |
| **Public items** | Add `'public'` to `items.visibility` enum; expose items to non-connected users |
| **Push notifications** | Add a `device_tokens` table linked to `users`; add `'push'` to `reminders.channel` |
| **Audit log** | `audit_log` table: `table_name`, `record_id`, `action`, `changed_by`, `diff JSONB` |

---

*Schema version: 1.0 — MVP*
*Database: PostgreSQL 15+ recommended (uses `gen_random_uuid()`, `TIMESTAMPTZ`, partial indexes)*