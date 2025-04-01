const pool = require("../config/db"); // PostgreSQL connection

// Book a Train Ticket
exports.bookTrain = async (req, res) => {
  const { user_id, train_id, seats_booked } = req.body;

  try {
    // Check if the train exists and has enough available seats
    const train = await pool.query("SELECT * FROM trains WHERE id = $1", [train_id]);

    if (train.rows.length === 0) {
      return res.status(404).json({ error: "Train not found" });
    }

    if (train.rows[0].seats_available < seats_booked) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    // Insert booking into database
    const newBooking = await pool.query(
      "INSERT INTO bookings (user_id, train_id, seats_booked) VALUES ($1, $2, $3) RETURNING *",
      [user_id, train_id, seats_booked]
    );

    // Update train seats availability
    await pool.query(
      "UPDATE trains SET seats_available = seats_available - $1 WHERE id = $2",
      [seats_booked, train_id]
    );

    res.status(201).json({ message: "Booking successful", booking: newBooking.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Bookings for a User
exports.getUserBookings = async (req, res) => {
  const { user_id } = req.params;

  try {
    const bookings = await pool.query(
      "SELECT b.id, t.name AS train_name, t.source, t.destination, b.seats_booked FROM bookings b JOIN trains t ON b.train_id = t.id WHERE b.user_id = $1",
      [user_id]
    );

    res.json(bookings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Cancel a Booking
exports.cancelBooking = async (req, res) => {
  const { id } = req.params; // Booking ID

  try {
    // Find the booking
    const booking = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);

    if (booking.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update available seats in the train
    await pool.query(
      "UPDATE trains SET seats_available = seats_available + $1 WHERE id = $2",
      [booking.rows[0].seats_booked, booking.rows[0].train_id]
    );

    // Delete the booking
    await pool.query("DELETE FROM bookings WHERE id = $1", [id]);

    res.json({ message: "Booking canceled successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
