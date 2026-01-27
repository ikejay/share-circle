# base-shop

## Overview

Modern e-commerce platform with Vue.js/Quasar frontend and Node.js/TypeScript backend, featuring a PostgreSQL database
with Knex.js for data operations. Users can browse products, view details, and add items to their cart.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ikejay/base-shop.git
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

### Common Prerequisites(For both)

| Tool           | Minimum Version | Recommended Version |   Verification Command    |
|:---------------|:---------------:|:-------------------:|:-------------------------:|
| Docker         |     20.10+      |         24          |     docker --version      |
| Docker Compose |      2.12+      |        2.24+        | docker-compose --versioon |
| Node           |      20.x       |        22.x         |      node --version       |
| Yarn           |     1.22.x      |       1.22.22       |      yarn --version       |

### Frontend Specific Prerequisite

| Tool       | Requiired Version |       Purpose       | Verification Command |
|:-----------|:-----------------:|:-------------------:|:--------------------:|
| Vue CLI    |       5.0.8       | Project Scaffolding |    vue --version     |
| Quasar CLI |       2.0+        |    UI Framework     |  quasar --versioon   |
| Typescript |       20.x        |     Type Safety     |  npx tsc --version   |

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
- JWT with Passport Authentication (Multiple strategies)
    - Local login (email and password)
    - Google OAuth
    - Apple OAuth

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