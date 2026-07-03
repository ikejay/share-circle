# Share Circle

Share Circle is an item-sharing platform for trusted circles. Users can sign in with Google, manage contacts, list items they are willing to share, and build a lending network around people they know.

The repository contains three TypeScript apps:

- `backend/` - Express API, PostgreSQL persistence, Google OAuth, session storage, seeders, and business-object tests.
- `frontend/` - Quasar/Vue user app for landing, authentication, dashboard, items, and contacts.
- `admin/` - Quasar/Vue admin app for managing dashboard data such as brands and products.

## Current Status

This project is in active MVP development. The backend has the core domain objects and seeders for users, contacts, items, categories, sharing, requests, transactions, reminders, notifications, and social accounts. The public API currently exposes health and authentication routes; more business routes can be added on top of the existing domain layer.

See [DATABASE_DESIGN.md](./DATABASE_DESIGN.md) for the intended data model.

## Prerequisites

- Node.js 20 or newer
- Yarn 1.22 or newer
- Docker and Docker Compose
- Google OAuth credentials for login

## Local Setup

### 1. Configure PostgreSQL

Create a root `.env` file for Docker Compose:

```bash
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
```

Start PostgreSQL:

```bash
docker-compose up -d
```

Only PostgreSQL is enabled in Docker Compose right now. Run the backend and frontend apps directly with Yarn during development.

### 2. Configure the backend

Create `backend/.env`:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres

HOST_NAME=localhost
PORT=3000
NODE_ENV=development
SESSION_SECRET=replace-with-a-local-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:9000
```

The Google OAuth callback URL must match:

```text
http://localhost:3000/api/auth/google/callback
```

Install dependencies and start the API:

```bash
cd backend
yarn
yarn dev
```

The API runs on `http://localhost:3000`.

Useful endpoints:

- `GET /api/health`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/check`
- `GET /api/auth/who-am-i`
- `GET /api/auth/logout`

### 3. Run the user app

```bash
cd frontend
yarn
yarn dev
```

The Quasar dev server runs on `http://localhost:9000` by default.

### 4. Run the admin app

```bash
cd admin
yarn
yarn dev
```

If the frontend is already using port `9000`, Quasar will prompt for another available port.

## Development Scripts

### Backend

```bash
yarn dev         # run the API with ts-node and file watching
yarn build       # compile TypeScript
yarn start       # run compiled output from dist/
yarn test        # run Jest in watch mode
yarn test-cover  # run Jest with coverage
```

### Frontend and Admin

```bash
yarn dev    # run Quasar dev server
yarn build  # build production assets
yarn test   # placeholder test command
```

## Project Structure

```text
share-circle/
├── admin/                  # Admin Quasar app
├── backend/                # Express API and domain layer
│   ├── src/
│   │   ├── business-objects/
│   │   ├── identity-provider/
│   │   ├── postgres/
│   │   ├── routes/
│   │   └── seeder/
│   └── test-setup/
├── frontend/               # User-facing Quasar app
├── DATABASE_DESIGN.md      # MVP database design notes
├── docker-compose.yaml     # PostgreSQL service
└── README.md
```

## Notes

- The backend creates the `share_circle` and `user_sessions` schemas on startup.
- Backend seeders run on startup and populate default categories, users, and items.
- Frontend API clients use `/api` as the base URL and expect the development server proxy to reach the backend.
- Session cookies are used for authentication, so local frontend/backend origins must be configured consistently with `FRONTEND_URL`.
