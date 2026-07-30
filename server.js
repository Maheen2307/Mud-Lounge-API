require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Import database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ==========================================
// 1. GET Endpoint: Retrieve all bookings from PostgreSQL
// ==========================================
app.get('/api/bookings', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM bookings ORDER BY created_at DESC;');
        res.status(200).json({
            success: true,
            count: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error("Database Error:", error.message);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve bookings from database."
        });
    }
});

// ==========================================
// 2. POST Endpoint: Handle, Validate & Save Booking
// ==========================================
app.post('/api/bookings', async (req, res) => {
    console.log("New Booking Received:", req.body);
    const { fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot } = req.body;

    // Strict Server-Side Data Validation
    if (!fullName || !emailAddress || !contactNo || !sessionCategory || !preferredDate || !timeSlot) {
        return res.status(400).json({
            success: false,
            error: "All required fields must be filled out completely."
        });
    }

    // Email format validation check
    if (!emailAddress.includes('@') || !emailAddress.includes('.')) {
        return res.status(400).json({
            success: false,
            error: "Please enter a valid email address format."
        });
    }

    try {
        // Insert into PostgreSQL using Parameterized Queries ($1 - $6 prevents SQL injection)
        const query = `
            INSERT INTO bookings (full_name, email_address, contact_no, session_category, preferred_date, time_slot)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot];
        const result = await db.query(query, values);

        // Success Response
        return res.status(201).json({
            success: true,
            message: "Your pottery wheel session has been successfully reserved!",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Database Insert Error:", error.message);
        return res.status(500).json({
            success: false,
            error: "Database error occurred while processing your booking."
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});

// Export app for Vercel serverless functions
module.exports = app;