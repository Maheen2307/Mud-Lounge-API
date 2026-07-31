# 🏺 The Mud Lounge — RESTful API & PostgreSQL Database

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A robust RESTful Backend API for The Mud Lounge featuring PostgreSQL database integration, duplicate booking prevention logic, secure SQL query handling, and strict server-side validation. Developed as part of the DecodeLabs Full-Stack Internship.

🌐 **Live API Endpoint:** [https://mud-lounge-api.vercel.app/api/bookings](https://mud-lounge-api.vercel.app/api/bookings)

🎨 **Frontend Repository:** [Mud-Lounge-UI](https://github.com/Maheen2307/Mud-Lounge-UI)

---

## 🛠️ Features & Validation Logic
- **Cloud Database Integration:** Uses `pg` to establish a persistent connection with a Neon Cloud PostgreSQL database.
- **SQL Injection Protection:** Utilizes parameterized SQL queries (`$1, $2, etc.`) for maximum database security.
- **GET `/api/bookings`**: Fetches all reserved studio bookings dynamically from the database (`200 OK`).
- **POST `/api/bookings`**: Processes new bookings with strict server-side validation:
  - **Syntactic Validation**: Verifies that all required fields are present (`fullName`, `emailAddress`, `contactNo`, `sessionCategory`, `preferredDate`, `timeSlot`).
  - **Semantic Validation**: Verifies valid email address format.
  - **Status Codes**: Returns standard HTTP response codes (`201 Created` on success, `400 Bad Request` on validation failure).

---

## 🧰 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Hosted on Neon)
- **Dependencies:** `express`, `cors`, `pg`, `dotenv`
- **Deployment:** Vercel

---

## 📍 API Endpoints

| Method | Endpoint | Description | Success Code | Error Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/bookings` | Retrieve all studio bookings from database | `200 OK` | `500 Internal Error` |
| `POST` | `/api/bookings` | Submit a new booking reservation to database | `201 Created` | `400 Bad Request` |

---

## ⚙️ Setup & Local Run

### 1. Clone & Install
```bash
git clone [https://github.com/Maheen2307/Mud-Lounge-API.git](https://github.com/Maheen2307/Mud-Lounge-API.git)
cd Mud-Lounge-API
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your PostgreSQL connection string:
```env
PORT=5000
DATABASE_URL=postgresql://your_user:your_password@your_neon_host/neondb?sslmode=require
```

### 3. Start the Server
```bash
node server.js
```
> The backend server will run on `http://localhost:5000`

---

## 📄 License
This project is licensed under the **MIT License**.
