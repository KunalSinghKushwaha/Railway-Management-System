const pool = require("../config/db"); // PostgreSQL connection

// Get All Trains
exports.getTrains = async (req, res) => {
  try {
    const trains = await pool.query("SELECT * FROM trains ORDER BY id ASC");
    res.json(trains.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get Train by ID
exports.getTrainById = async (req, res) => {
  const { id } = req.params;

  try {
    const train = await pool.query("SELECT * FROM trains WHERE id = $1", [id]);

    if (train.rows.length === 0) {
      return res.status(404).json({ error: "Train not found" });
    }

    res.json(train.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Add New Train
exports.addTrain = async (req, res) => {
  const { name, source, destination, departure_time, arrival_time, seats_available } = req.body;

  try {
    const newTrain = await pool.query(
      "INSERT INTO trains (name, source, destination, departure_time, arrival_time, seats_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, source, destination, departure_time, arrival_time, seats_available]
    );

    res.status(201).json({ message: "Train added successfully", train: newTrain.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update Train
exports.updateTrain = async (req, res) => {
  const { id } = req.params;
  const { name, source, destination, departure_time, arrival_time, seats_available } = req.body;

  try {
    const updatedTrain = await pool.query(
      "UPDATE trains SET name = $1, source = $2, destination = $3, departure_time = $4, arrival_time = $5, seats_available = $6 WHERE id = $7 RETURNING *",
      [name, source, destination, departure_time, arrival_time, seats_available, id]
    );

    if (updatedTrain.rows.length === 0) {
      return res.status(404).json({ error: "Train not found" });
    }

    res.json({ message: "Train updated successfully", train: updatedTrain.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Train
exports.deleteTrain = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrain = await pool.query("DELETE FROM trains WHERE id = $1 RETURNING *", [id]);

    if (deletedTrain.rows.length === 0) {
      return res.status(404).json({ error: "Train not found" });
    }

    res.json({ message: "Train deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
