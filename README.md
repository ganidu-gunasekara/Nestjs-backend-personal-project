# Clothing Website Backend - Work in Progress 🧵🛠️

> ⚠️ **IMPORTANT:** All active development is on the [`dev` branch](https://github.com/yourusername/your-backend-repo/tree/dev).  
> Please switch to the `dev` branch to access the latest updates. The `main` branch may not be current.

This is the backend API for the clothing website, built with **NestJS**, **Prisma**, and **PostgreSQL**. It powers core features such as user accounts, product listings, cart logic, and order processing.

---

## 🚧 Project Status

**Work In Progress**  
This backend is currently under development. Some functionality is incomplete or planned.

---

## 📦 Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (planned)
- **Language:** TypeScript

---

## 🚀 Features (Planned / In Progress)

- 🧑 User registration & login
- 🔐 JWT-based authentication (planned)
- 👕 Product management (CRUD)
- 🛒 Shopping cart system
- 📦 Order creation and tracking
- 🧾 Order history per user
- 🛠 Admin-only product management (planned)

---

## 🧪 Getting Started

To run this project locally from the `dev` branch:

```bash
# 1. Clone the repository and switch to dev
git clone -b dev https://github.com/yourusername/your-backend-repo.git

# 2. Navigate to the project directory
cd your-backend-repo

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# Edit the .env file with your PostgreSQL DB URL and other config

# 5. Push Prisma schema to your database
npx prisma migrate dev --name init

# 6. Start the development server
npm run start:dev
