# 🎓 Student Management System Backend

A robust Node.js & Express API for managing users and students, featuring authentication, role-based access, and MongoDB integration.

---

## 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 👨‍💼 Admin-only student management (CRUD)
- 🛡️ Role-based access control
- ⚙️ Environment config via `.env`
- 🗄️ MongoDB (Mongoose)
- 📑 Swagger API docs

---

## 🧰 Technologies Used

| Tech         | Purpose                |
|--------------|------------------------|
| Node.js      | Backend runtime        |
| Express      | API framework          |
| MongoDB      | Database               |
| Mongoose     | ODM for MongoDB        |
| JWT          | Authentication         |
| dotenv       | Env variables          |
| bcryptjs     | Password hashing       |
| Swagger      | API documentation      |

---

## 🗂️ Folder Structure

```
├── Controllers/
│   ├── authController.js
│   ├── studentController.js
│   └── userController.js
├── Middleware/
│   ├── Authenticator.js
│   └── sendMails.js
├── Models/
│   └── User.js
├── Routes/
│   ├── authRoute.js
│   ├── studentRoute.js
│   └── userRoute.js
├── .env
├── index.js
└── package.json
```

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   
   cd Student-Management-SystemBackend
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` File**
   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the Server**
   ```sh
   npm start
   ```

---

## 📡 API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint     | Description           |
|--------|--------------|----------------------|
| POST   | /register    | Register user        |
| POST   | /login       | Login & get token    |
| POST   | /logout      | Logout user          |

### User Routes (`/api/users`)
| Method | Endpoint      | Description                  |
|--------|---------------|-----------------------------|
| GET    | /me           | Get own profile             |
| PUT    | /me           | Update own profile          |
| PUT    | /role/:id     | Admin: Update user role     |

### Student Routes (`/api/students`)
| Method | Endpoint      | Description                  |
|--------|---------------|-----------------------------|
| GET    | /             | Admin: Get all students     |
| GET    | /:id          | Admin: Get single student   |
| POST   | /             | Admin: Add student          |
| PUT    | /:id          | Admin: Update student       |
| DELETE | /:id          | Admin: Delete student       |

---

## 🔒 Role-Based Access

| Endpoint             | Access Level         |
|----------------------|---------------------|
| `/api/auth/*`        | Public              |
| `/api/users/me`      | Authenticated Users |
| `/api/students/*`    | Admin Only          |

---

## 🧪 Testing

- [Postman](https://www.postman.com/)
- [Thunder Client (VS Code)](https://www.thunderclient.com/)

---

## 📑 Swagger Documentation

Swagger is integrated for easy API exploration.  
Visit `/api-docs` after starting the server.

---

## 📝 License


