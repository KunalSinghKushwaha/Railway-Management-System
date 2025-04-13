import Train from "../models/train.js";

// Get All Trains
export async function getTrains(_req, res) {
  try {
    const trains = await Train.findAll({
      order: [["id", "ASC"]],
    });
    res.json(trains);
  } catch (err) {
    console.error("Error fetching trains:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// Get Train by ID
export async function getTrainById(req, res) {
  const { id } = req.params;

  try {
    const train = await Train.findByPk(id);
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }
    res.json(train);
  } catch (err) {
    console.error("Error fetching train:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// Add New Train
export async function addTrain(req, res) {
  const { name, number, source, destination, departureTime, arrivalTime, seatsAvailable, fare } = req.body;

  try {
    const newTrain = await Train.create({
      name,
      number,
      source,
      destination,
      departureTime,
      arrivalTime,
      seatsAvailable,
      fare,
    });

    res.status(201).json({ message: "Train added successfully", train: newTrain });
  } catch (err) {
    console.error("Error adding train:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// Update Train
export async function updateTrain(req, res) {
  const { id } = req.params;
  const { name, number, source, destination, departureTime, arrivalTime, seatsAvailable, fare } = req.body;

  try {
    const train = await Train.findByPk(id);
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    await train.update({
      name,
      number,
      source,
      destination,
      departureTime,
      arrivalTime,
      seatsAvailable,
      fare,
    });

    res.json({ message: "Train updated successfully", train });
  } catch (err) {
    console.error("Error updating train:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// Delete Train
export async function deleteTrain(req, res) {
  const { id } = req.params;

  try {
    const train = await Train.findByPk(id);
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    await train.destroy();
    res.json({ message: "Train deleted successfully" });
  } catch (err) {
    console.error("Error deleting train:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
