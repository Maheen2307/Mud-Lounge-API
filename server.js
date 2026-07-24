const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory storage for studio bookings
let bookings = [];

// ==========================================
// 1. GET Endpoint: Retrieve all bookings
// ==========================================
app.get('/api/bookings', (req, res) => {
    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

// ==========================================
// 2. POST Endpoint: Handle & Validate Booking
// ==========================================
app.post('/api/bookings', (req, res) => {
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

    // Process and store the booking data
    const newBooking = {
        id: Date.now().toString(),
        fullName,
        emailAddress,
        contactNo,
        sessionCategory,
        preferredDate,
 timeSlot,
        createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    // Success Response
    return res.status(201).json({
        success: true,
        message: "Your pottery wheel session has been successfully reserved!",
        data: newBooking
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});

// Export app for Vercel serverless functions
module.exports = app;