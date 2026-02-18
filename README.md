# Project Tracker Backend

A production-ready REST API built using **Node.js, Express, and PostgreSQL** following clean architecture principles and best backend practices.

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt (Password Hashing)
- Joi (Request Validation)
- Layered Architecture (Controller → Service → Query)

---

# Architecture Overview

The project follows a clean layered structure:

src/
│
├── config/ # DB & environment configs
├── constants/ # Status codes, messages
├── controllers/ # Request/response handlers
├── db/ # DB sync & table creation
│ ├── sync.js
│ └── tables/
├── middlewares/ # Auth & error handling
├── query/ # Raw SQL queries
├── routes/ # API route definitions
├── seeders/ # Initial data seed
├── services/ # Business logic
├── utils/ # Helper functions
├── validations/ # Joi schemas
│
├── app.js
└── server.js

---

# Project Setup

## Clone Repository

```bash

git clone <your-repo-url>
cd project-tracker-backend
npm install

```

## Create a .env file in the root directory:

PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=project_tracker
DB_SSL=false

JWT_SECRET=project_tracker_secret_key_346565
JWT_EXPIRES_IN=1d

## Create PostgreSQL Database

CREATE DATABASE project_tracker;

This project uses automatic database synchronization.
When the server starts:
- Required extensions are created
- ENUM types are created
- Tables are created (if not exists)
- Indexes are created
- No manual schema execution required.

## Start Development Server

```bash

npm run dev

```

## Running Seeder

```bash

npm run seed

```

# Default Credentials

Email: admin@example.com
Password: Admin@123

# Authentication

- This API uses JWT Authentication.
- After login, include token in request header:
   Authorization: Bearer <your_token>
- All project routes are protected.

# API Endpoints(Postman Collection URL)

https://documenter.getpostman.com/view/32850386/2sBXcDHMN5

# AI Usage Disclosure

AI assistance tools were used minimally during development for:
- Drafting boilerplate structure
- Improving documentation clarity
- Reviewing code organization patterns
- Some Debugging
- All architectural decisions, database design, authentication flow, and implementation logic were designed, implemented, and validated manually.
- AI was used strictly as a productivity aid and not as a substitute for understanding or development ownership.
