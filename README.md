# Task-Manager-API

A RESTful API for user authentication and task management built with **Node.js**, **Express**, **Sequelize**, and **MySQL**.

---

## **Features**

- User authentication with signup, signin, and signout functionality
- Role-based access control: **Admin**, **Moderator**, and **User**
- CRUD operations for tasks
- Task filtering by status and pagination support
- Secure password hashing using **bcrypt**
- JWT-based authentication
- Sequelize ORM for MySQL database interaction

---

## **Tech Stack**

- **Backend:** Node.js, Express
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT, bcrypt
- **Environment Configuration:** dotenv

---

## **Getting Started**

### **Prerequisites**

- Node.js (v14 or higher recommended)
- MySQL database
- npm or yarn

---

### **Installation**

1. Clone the repository:

```bash
git clone https://github.com/rayan495/Task-Manager-API.git
cd Task-Manager-API
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory with your configuration:

```bash
PORT=3000
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret
```

4. Run the server:

```bash
npm start
```

The server will run on http://localhost:3000

---

### **API Endpoints**

1. Authentication:

- POST /auth/signup Register a new user
- POST /auth/signin Login a user
- POST /auth/signout Logout a user

2. User:

- GET /user/all Public content
- GET /user/user Access for authenticated users
- GET /user/admin Access for admins
- GET /user/moderator Access for moderators

3. Tasks:

- POST /task Create a new task
- GET /task Get all tasks of authenticated user
- GET /task/user Get tasks by logged-in user
- GET /task/:id Get task by ID
- PUT /task/:id Update a task
- DELETE /task/:id Delete a task (Admin/User only)

---

### **Usage**

Usage:

1. Sign up a user via /auth/signup.
2. Login with /auth/signin to receive a JWT token.
3. Include the JWT token in the Authorization header as Bearer <token> to access protected routes.
4. Create, read, update, or delete tasks based on user role and ownership.

---

### **Security**

- Passwords are hashed using bcrypt before saving to the database
- JWT tokens are used for route protection and role-based access control

---

## **License**

- This project is open-source and available under the MIT License.

---
