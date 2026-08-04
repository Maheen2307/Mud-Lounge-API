# 🏺 The Mud Lounge — RESTful API & PostgreSQL Database

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A serverless RESTful Backend API for **The Mud Lounge** integrated with a Neon Cloud PostgreSQL database. Features parameterized SQL query protection, strict server-side validation rules, slot capacity tracking, duplicate booking protection, and complete **CRUD (Create, Read, Update, Delete)** endpoints prepared for future Admin Dashboard integration. Developed as part of the DecodeLabs Full-Stack Internship.

🌐 **Live API Endpoint:** [https://mud-lounge-api.vercel.app/api/bookings](https://mud-lounge-api.vercel.app/api/bookings)

🎨 **Frontend Repository:** [Mud-Lounge-UI](https://github.com/Maheen2307/Mud-Lounge-UI)

---

## 📂 Repository File Structure

```text
Mud-Lounge-API/
├── config/            # Database connection pool configuration (`db.js`)
├── .env               # Environment variable secrets (ignored by Git)
├── .gitignore         # Git ignore rules (node_modules, .env)
├── LICENSE            # MIT License documentation
├── README.md          # Project documentation & usage guide
├── package.json       # Node dependencies and project scripts
├── server.js          # Express app entry point & CRUD API route handlers
└── vercel.json        # Vercel serverless deployment routing config
```

---

## 🛠️ Features & Validation Logic
- **Cloud Database Connection:** Uses the `pg` driver to connect securely to a serverless Neon Cloud PostgreSQL instance.
- **SQL Injection Prevention:** All SQL queries use parameterized arguments (`$1, $2, etc.`) to prevent injection attacks.
- **Server-Side Field Validation:** Ensures all required parameters (`fullName`, `emailAddress`, `contactNo`, `sessionCategory`, `preferredDate`, `timeSlot`) are provided and formatted properly before executing queries.
- **Duplicate Booking Prevention:** Limits users to a maximum of **1 reservation per day** by checking existing email and date records (`HTTP 409 Conflict`).
- **Slot Capacity Restriction:** Enforces a maximum capacity of **5 bookings per time slot** for any given date to prevent studio overbooking (`HTTP 409 Conflict`).
- **Full CRUD Support:** 
  - **Create (`POST`)**: Processes new pottery studio reservations.
  - **Read (`GET`)**: Retrieves all reservations ordered by latest creation date.
  - **Update (`PUT`)**: Edits existing booking details by primary ID.
  - **Delete (`DELETE`)**: Removes cancelled or outdated reservations by ID.

---

## 🧰 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Hosted on Neon Cloud)
- **Dependencies:** `express`, `cors`, `pg`, `dotenv`
- **Deployment:** Vercel

---

## 📍 API Endpoints

| Method | Endpoint | Description | Success Code | Error Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/bookings` | Retrieve all studio bookings from the database | `200 OK` | `500 Internal Error` |
| `POST` | `/api/bookings` | Validate & insert a new reservation | `201 Created` | `400 / 409 / 500` |
| `PUT` | `/api/bookings/:id` | Update an existing booking's date or time slot | `200 OK` | `404 / 500` |
| `DELETE` | `/api/bookings/:id` | Remove a booking record from the database | `200 OK` | `404 / 500` |

---

## ⚙️ Setup & Local Run

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Maheen2307/Mud-Lounge-API.git
cd Mud-Lounge-API
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your Neon PostgreSQL connection string:
```env
PORT=5000
DATABASE_URL=postgresql://your_user:your_password@your_neon_host/neondb?sslmode=require
```

### 3. Start the Server
```bash
node server.js
```
> The server will start locally at `http://localhost:5000`

---

## 📄 License
This project is licensed under the **MIT License**.
