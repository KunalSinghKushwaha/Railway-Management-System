const express = require("express");
const { getAllTrains, getTrainById, addTrain, updateTrain, deleteTrain } = require("../controllers/traincontroller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all trains
router.get("/", getAllTrains);

// Get a single train by ID
router.get("/:id", getTrainById);

// Add a new train (Protected - Admin only)
router.post("/", authMiddleware, addTrain);

// Update train details (Protected - Admin only)
router.put("/:id", authMiddleware, updateTrain);

// Delete a train (Protected - Admin only)
router.delete("/:id", authMiddleware, deleteTrain);

module.exports = router;
