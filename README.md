# 🏺 The Mud Lounge — RESTful API & PostgreSQL Database

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A robust RESTful Backend API for **The Mud Lounge** featuring PostgreSQL database integration, secure parameterized SQL queries, strict server-side validation, and complete **CRUD (Create, Read, Update, Delete)** operations prepared for future Admin Dashboard integration. Developed as part of the DecodeLabs Full-Stack Internship.

🌐 **Live API Endpoint:** [https://mud-lounge-api.vercel.app/api/bookings](https://mud-lounge-api.vercel.app/api/bookings)

🎨 **Frontend Repository:** [Mud-Lounge-UI](https://github.com/Maheen2307/Mud-Lounge-UI)

---

## 📂 Repository File Structure

```text
Mud-Lounge-API/
├── config/           # Database connection pool configuration
├── .gitignore        # Git ignore rules (node_modules, .env)
├── LICENSE           # MIT License documentation
├── README.md         # Project documentation & usage guide
├── package.json      # Project dependencies and script configurations
├── server.js         # Main Express application & full CRUD API routes
└── vercel.json       # Vercel serverless deployment configurations
```

---

## 🛠️ Features & Validation Logic
- **Cloud Database Integration:** Uses the `pg` native driver to establish a persistent connection with a Neon Cloud PostgreSQL database.
- **SQL Injection Protection:** Utilizes parameterized SQL queries (`$1, $2, etc.`) for maximum database security.
- **Full CRUD Support:** 
  - **Create (`POST`)**: Submits new studio booking reservations with strict server-side validation.
  - **Read (`GET`)**: Dynamically fetches all reserved studio bookings from the database.
  - **Update (`PUT`)**: Modifies existing booking schedules (prepared for Admin Dashboard integration).
  - **Delete (`DELETE`)**: Removes cancelled or outdated bookings from the database.
- **Server-Side Validation:** Verifies required form fields, data types, and proper email formatting before hitting the database.

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
| `PUT` | `/api/bookings/:id` | Update an existing booking's date/time slot | `200 OK` | `400 / 404 / 500` |
| `DELETE` | `/api/bookings/:id` | Remove a specific booking from database | `200 OK` | `404 / 500` |

---

## ⚙️ Setup & Local Run

### 1. Clone & Install
```bash
git clone https://github.com/Maheen2307/Mud-Lounge-API.git
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
> The backend server will run locally on `http://localhost:5000`

---

## 📄 License
This project is licensed under the **MIT License**.
