const express = require("express");
const { bookTrain, getUserBookings, cancelBooking } = require("../controllers/bookingcontroller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Book a train (Protected Route)
router.post("/book", authMiddleware, bookTrain);

// Get all bookings for a user (Protected Route)
router.get("/my-bookings", authMiddleware, getUserBookings);

// Cancel a booking (Protected Route)
router.delete("/cancel/:id", authMiddleware, cancelBooking);

module.exports = router;
