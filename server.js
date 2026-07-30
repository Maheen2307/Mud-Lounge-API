const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool (Neon Cloud DB)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// =============================================================
// THE MUD LOUNGE - PROJECT 3: COMPLETE CRUD API ENDPOINTS
// =============================================================

// 1. CREATE (POST): Nayi pottery session booking submit karna
app.post('/api/bookings', async (req, res) => {
    try {
        const { fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot } = req.body;

        // Syntactic Validation Check
        if (!fullName || !emailAddress || !contactNo || !sessionCategory || !preferredDate || !timeSlot) {
            return res.status(400).json({ 
                success: false, 
                message: 'All required fields must be provided.' 
            });
        }

        // Database Insertion (Using lowercase column names to match Postgres defaults)
        const query = `
            INSERT INTO bookings (fullname, emailaddress, contactno, sessioncategory, preferreddate, timeslot) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;
        const values = [fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot];
        const newBooking = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully!',
            data: newBooking.rows[0]
        });
    } catch (error) {
        console.error('Database Insertion Error:', error);
        res.status(500).json({ success: false, error: 'Database insertion failed.' });
    }
});

// 2. READ (GET): Database se saari bookings fetch karna
app.get('/api/bookings', async (req, res) => {
    try {
        const query = 'SELECT * FROM bookings ORDER BY id DESC';
        const result = await pool.query(query);

        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully!',
            data: result.rows
        });
    } catch (error) {
        console.error('Database Fetch Error:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve bookings.' });
    }
});

// 3. UPDATE (PUT): Existing booking ki details update karna
app.put('/api/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot } = req.body;

        const query = `
            UPDATE bookings 
            SET fullname = $1, emailaddress = $2, contactno = $3, sessioncategory = $4, preferreddate = $5, timeslot = $6 
            WHERE id = $7 
            RETURNING *
        `;
        const values = [fullName, emailAddress, contactNo, sessionCategory, preferredDate, timeSlot, id];
        const updatedBooking = await pool.query(query, values);

        if (updatedBooking.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Booking not found.' });
        }

        res.status(200).json({
            success: true,
            message: `Booking ID ${id} updated successfully!`,
            updatedData: updatedBooking.rows[0]
        });
    } catch (error) {
        console.error('Database Update Error:', error);
        res.status(500).json({ success: false, error: 'Failed to update booking.' });
    }
});

// 4. DELETE (DELETE): Kisi booking ko permanently database se remove karna
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM bookings WHERE id = $1 RETURNING *';
        const deletedBooking = await pool.query(query, [id]);

        if (deletedBooking.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Booking not found.' });
        }

        res.status(200).json({
            success: true,
            message: `Booking ID ${id} permanently deleted.`
        });
    } catch (error) {
        console.error('Database Delete Error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete booking.' });
    }
});

// Local Development Server Listen
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// CRITICAL FOR VERCEL DEPLOYMENT (Fixes the 500 Serverless Crash Error)
module.exports = app;