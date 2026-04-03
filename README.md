# 🔐 Authentication System API

A secure and scalable backend authentication system built with Node.js, Express, and MongoDB.
Implements JWT-based authentication with refresh token mechanism and protected routes.

---

## 🚀 Features

* User Signup & Login
* Password hashing using bcrypt
* JWT-based authentication
* Access & Refresh token system
* Protected routes (middleware-based)
* Logout functionality
* Clean modular folder structure

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* bcrypt

---

## 📂 Project Structure

```
auth-system/
 ├── config/
 │    └── db.js
 ├── models/
 │    └── User.js
 ├── controllers/
 │    └── authController.js
 ├── routes/
 │    └── authRoutes.js
 ├── middleware/
 │    └── authMiddleware.js
 ├── utils/
 │    └── generateToken.js
 ├── server.js
 └── .env
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd auth-system
```

### 2. Install Dependencies

```
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 4. Run Server

```
npx nodemon server.js
```

---

## 🔌 API Endpoints

### 🔹 Auth Routes

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/api/auth/signup`  | Register user             |
| POST   | `/api/auth/login`   | Login & get tokens        |
| POST   | `/api/auth/refresh` | Generate new access token |
| POST   | `/api/auth/logout`  | Logout user               |
| GET    | `/api/auth/profile` | Protected route           |

---

## 🔐 Authentication Flow

1. User signs up → password is hashed and stored
2. User logs in → receives:

   * Access Token (short-lived)
   * Refresh Token (long-lived)
3. Access protected routes using:

```
Authorization: Bearer <accessToken>
```

4. When access token expires → use refresh token to get a new one

---

## 🧪 Testing (Postman)

### Signup

```
POST /api/auth/signup
```

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

### Login

```
POST /api/auth/login
```

Response:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

### Protected Route

```
GET /api/auth/profile
```

Header:

```
Authorization: Bearer <accessToken>
```

---

### Refresh Token

```
POST /api/auth/refresh
```

```json
{
  "refreshToken": "your_refresh_token"
}
```

---

## 🔒 Security Practices

* Passwords are hashed using bcrypt
* JWT tokens are signed securely
* Access tokens have short expiry
* Refresh tokens stored in DB
* Protected routes use middleware

---

## ⚡ Future Improvements

* Role-based authorization (admin/user)
* Email verification
* Forgot password functionality
* Rate limiting & security enhancements
* OAuth (Google login)

---

## 🎯 Conclusion

This project demonstrates a complete authentication flow used in real-world applications, including token-based security, middleware protection, and scalable backend architecture.

---

## 👨‍💻 Author

**Akash Deep**

---
