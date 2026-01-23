# base-shop

## Overview

Modern e-commerce platform with Vue.js/Quasar frontend and Node.js/TypeScript backend, featuring a PostgreSQL database
with Knex.js for data operations. Users can browse products, view details, and add items to their cart.

## Quick Start

```bash
# Clone the repository
https://github.com/ikejay/base-shop.git
cd base-shop

# Start all services with Docker
docker-compose up
```

## Access the Application

- Frontend: http://localhost:9000

- Backend API: http://localhost:3000/api

- Database: PostgreSQL on port 5432

## Features

### Frontend(Vue.js + Quasar)

- Product catalog browsing
- product detail page with images and descriptions
- Shopping cart functionality
- Responsive design for all devices
- Type-safe development with Typescript

### Backend(Node.js + Typescript)

- Restful Api build with Expressjs
- Type-safe development with Typescript
- PostgreSQL database with Knex.js querybuilder
- User authentication and authorization
- Product and inventory management

## Prerequisites

- Docker && Docker Compose
- Node 22
- Git

## Teck Stack

### Frontend

- Vue.js 3 with Option API
- Quasar UI Library
- Typescript
- Pinia(State Management)
- Axios(HTTP Client)

### Backend

- Node.js with Express
- Typescript
- PostgreSQL
- Knex.js (SQL query builder)
- Passport Authentication

### Infrastructure
- Docker && Docker Compose
- PostgreSQL 15+


## Setup & Installation
### Using Docker(Currently only Database works with docker)
```bash
# Clone and navigate to the project
https://github.com/ikejay/base-shop.git
cd base-shop

# Start the database service
docker-compose up --build

```


### Frontend
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
yarn

# Start development server
yarn dev

```

### Backend
```bash
# Navigate to frontend folder
cd backend

# Install dependencies
yarn

# Start development server
yarn dev

```

## Project Structure
```bash
shop/
├── backend/                    # Node.js + TypeScript API
│   ├── src/ 
│   │   ├── postgres/  
│   │   │   ├── migrations/     #database migrations
│   ├── Dockerfile              # Docker file
│   └── .env                    # Backend environment Variables
├── frontend/                   # Vue.js + Quasar app
│   ├── src/
│   │   ├── components/         # Vue components
│   │   ├── pages/              # Page views
│   │   └── stores/             # Pinia stores
│   └── quasar.config.js        # Quasar configuration
├── docker-compose.yml          # Service definitions
└── README.md                   # This file
```


## Environment Variables
### Backend(.env)
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=test
DB_USER=postgres
DB_PASSWORD=

PORT=3000
NODE_ENVIRONMENT=development
```