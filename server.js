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
        // 1. Explicit Duplicate Check Query
        const duplicateCheckQuery = `
            SELECT * FROM bookings 
            WHERE email_address = $1 AND session_category = $2 AND preferred_date = $3 AND time_slot = $4;
        `;
        const existingBooking = await db.query(duplicateCheckQuery, [emailAddress, sessionCategory, preferredDate, timeSlot]);

        if (existingBooking.rowCount > 0) {
            return res.status(409).json({
                success: false,
                error: "You have already reserved a spot for this session, date, and time slot!"
            });
        }

        // 2. Insert into PostgreSQL
        const insertQuery = `
            INSERT INTO bookings (full_name, email_address, contact_no, session_category, preferred_date, time_slot)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot];
        const result = await db.query(insertQuery, values);

        // Success Response
        return res.status(201).json({
            success: true,
            message: "Your pottery wheel session has been successfully reserved!",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Database Insert Error:", error);

        // Return exact database error message for debugging
        return res.status(500).json({
            success: false,
            error: `Database error: ${error.message}`
        });
    }
});

// ==========================================
// NOTE: UPDATE and DELETE operations are fully functional and prepared for future Admin Dashboard integration.
// ==========================================

// ==========================================
// 3. PUT Endpoint: Update an existing booking
// ==========================================
app.put('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const { fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot } = req.body;

    try {
        const updateQuery = `
            UPDATE bookings 
            SET full_name = COALESCE($1, full_name), 
                email_address = COALESCE($2, email_address), 
                contact_no = COALESCE($3, contact_no), 
                session_category = COALESCE($4, session_category), 
                preferred_date = COALESCE($5, preferred_date), 
                time_slot = COALESCE($6, time_slot)
            WHERE id = $7
            RETURNING *;
        `;
        const values = [fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot, id];
        const result = await db.query(updateQuery, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: "Booking not found with the given ID."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking successfully updated!",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Database Update Error:", error);
        return res.status(500).json({
            success: false,
            error: `Database error: ${error.message}`
        });
    }
});

// ==========================================
// 4. DELETE Endpoint: Remove a booking
// ==========================================
app.delete('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteQuery = 'DELETE FROM bookings WHERE id = $1 RETURNING *;';
        const result = await db.query(deleteQuery, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: "Booking not found with the given ID."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking successfully deleted!",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Database Delete Error:", error);
        return res.status(500).json({
            success: false,
            error: `Database error: ${error.message}`
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Live Server running smoothly on http://localhost:${PORT}`);
});
