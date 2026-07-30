# 🏺 The Mud Lounge — RESTful API & PostgreSQL Database

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A robust RESTful Backend API built with Node.js, Express, and PostgreSQL to handle pottery studio session reservations for **The Mud Lounge**. Developed as part of the DecodeLabs Full-Stack Internship.

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
- **PUT `/api/bookings/:id`**: Updates an existing booking's details using its unique ID (`200 OK`).
- **DELETE `/api/bookings/:id`**: Permanently removes a specific booking from the database (`200 OK`).

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
| `PUT` | `/api/bookings/:id` | Update existing booking details by ID | `200 OK` | `400 / 500 Error` |
| `DELETE` | `/api/bookings/:id` | Permanently delete a booking by ID | `200 OK` | `500 Internal Error` |

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
