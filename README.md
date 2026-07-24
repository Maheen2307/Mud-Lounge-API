# 🚀 Project 2: Backend API Development — DecodeLabs

A RESTful Backend API built with Node.js and Express to handle pottery studio session reservations for **The Mud Lounge**.

---

## 🛠️ Features & Validation Logic
- **GET `/api/bookings`**: Fetches all reserved studio bookings (`200 OK`).
- **POST `/api/bookings`**: Processes new bookings with strict server-side validation:
  - **Syntactic Validation**: Verifies that all required fields are present (`fullName`, `emailAddress`, `contactNo`, `sessionCategory`, `preferredDate`, `timeSlot`).
  - **Semantic Validation**: Verifies valid email address format (`@` and `.`).
  - **Status Codes**: Returns standard HTTP response codes (`201 Created` on success, `400 Bad Request` on validation failure).

---

## 🧰 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Dependencies:** `cors`, `express`

---

## ⚙️ Setup & Local Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   node server.js
   ```
   > The backend server will run on `http://localhost:5000`

---

## 📍 API Endpoints

| Method | Endpoint | Description | Success Code | Error Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/bookings` | Retrieve all studio bookings | `200 OK` | `500 Internal Error` |
| `POST` | `/api/bookings` | Submit a new booking reservation | `201 Created` | `400 Bad Request` |