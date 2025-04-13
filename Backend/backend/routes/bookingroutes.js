import { Router } from "express";
import { bookTrain, getUserBookings, cancelBooking } from "../controllers/bookingcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = Router();


router.post("/book/:id", authMiddleware, bookTrain);


router.get("/my-bookings/:id", authMiddleware, getUserBookings);


router.delete("/cancel/:id", authMiddleware, cancelBooking);

export default router;
