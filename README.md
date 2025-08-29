
# 📌 Backend - Task Management System

This is the **backend API** for the Task Management System.
It is built with **Node.js, Express, and MongoDB (Mongoose)**, featuring authentication, authorization, task management, activity tracking, and statistics.

---

## 🚀 Features

* User authentication with **JWT** (Register/Login).
* **Role-based access control** (Admin/User).
* CRUD operations for tasks.
* Activity logging (task updates, user actions).
* Statistics API (tasks by status, priority, overdue).
* Centralized error handling.
* Secure middleware (auth, validation).
* RESTful API structure.
* Jest + Supertest for testing.

---

## 📂 Project Structure

```
backend/
  src/
    config/
      db.js                # Database connection
    models/
      User.js              # User schema
      Task.js              # Task schema
      Activity.js          # Activity logs
    middleware/
      auth.js              # Auth & role middleware
      errorHandler.js      # Global error handler
    routes/
      auth.js              # Auth routes
      users.js             # User management routes
      tasks.js             # Task CRUD routes
      stats.js             # Stats routes
    controllers/
      authController.js    # Auth logic
      userController.js    # User logic
      taskController.js    # Task logic
      statsController.js   # Stats logic
    utils/
      generateToken.js     # JWT token generator
    app.js                 # Express app config
    server.js              # Server entry point
  tests/                   # Jest + Supertest tests
```

---

## 🛠️ Tech Stack

* **Backend Framework**: Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Auth**: JWT, bcrypt
* **Middleware**: CORS, cookie-parser, express-validator
* **Logging**: Morgan
* **Testing**: Jest + Supertest
* **Dev Tools**: Nodemon, ESLint, Prettier

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-repo/task-manager-backend.git
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file in the `backend/` directory:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_manager
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 4️⃣ Run the server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

Server runs at: **[http://localhost:5000](http://localhost:5000)**

---

## 📡 API Endpoints

### 🔑 Auth

* `POST /auth/register` → Register new user
* `POST /auth/login` → Login user & get token

### 👤 Users (Admin only)

* `GET /users` → Get all users
* `DELETE /users/:id` → Delete user

### ✅ Tasks

* `GET /tasks` → Get all tasks of logged-in user
* `POST /tasks` → Create new task
* `GET /tasks/:id` → Get task by ID
* `PUT /tasks/:id` → Update task
* `DELETE /tasks/:id` → Delete task

### 📊 Stats

* `GET /stats/overview` → Get task statistics (status, priority, overdue)

---

## 🧪 Testing

Run tests using **Jest + Supertest**:

```bash
npm test
```

---

## 🔒 Authentication & Authorization

* Uses **JWT** for authentication.
* Token is required in **Authorization header**:

  ```
  Authorization: Bearer <token>
  ```
* **Roles**:

  * `user`: Manage own tasks
  * `admin`: Manage users + all tasks

---




