const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =============================================================
// THE MUD LOUNGE - PROJECT 3: COMPLETE CRUD API ENDPOINTS
// =============================================================

// 1. CREATE (POST): Nayi workshop booking ya contact form submission
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, email, workshop, date } = req.body;

        // Validation Check
        if (!name || !email || !workshop) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and workshop are required fields.' 
            });
        }

        // Database Insertion (Parameterized Query for Security)
        // Example: const newBooking = await db.query('INSERT INTO bookings (name, email, workshop, date) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, workshop, date]);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully!',
            data: { name, email, workshop, date }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database insertion failed.' });
    }
});

// 2. READ (GET): Database se saari bookings fetch karna
app.get('/api/bookings', async (req, res) => {
    try {
        // Database Fetching Query
        // Example: const bookings = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');

        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully!',
            data: [] // Database records array
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to retrieve bookings.' });
    }
});

// 3. UPDATE (PUT): Existing booking ki details ya status change karna
app.put('/api/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { workshop, date, status } = req.body;

        // Database Update Query
        // Example: const updated = await db.query('UPDATE bookings SET workshop = $1, date = $2, status = $3 WHERE id = $4', [workshop, date, status, id]);

        res.status(200).json({
            success: true,
            message: `Booking ID ${id} updated successfully!`,
            updatedData: { id, workshop, date, status }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update booking.' });
    }
});

// 4. DELETE (DELETE): Kisi booking ko cancel ya database se remove karna
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Database Delete Query
        // Example: await db.query('DELETE FROM bookings WHERE id = $1', [id]);

        res.status(200).json({
            success: true,
            message: `Booking ID ${id} permanently deleted.`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete booking.' });
    }
});