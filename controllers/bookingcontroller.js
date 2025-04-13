import Booking from "../models/booking.js";
import Train from "../models/train.js";


// Book a train
export async function bookTrain(req, res) {
  const userId = req.params.id; // Get userId from token
  
  const { trainId, seatClass, date } = req.body;

  try {
    // Validate required fields
    if (!trainId || !seatClass || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const train = await Train.findByPk(trainId);
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    if (train.seatsAvailable < 1) {
      return res.status(400).json({ error: "No seats available" });
    }

    const booking = await Booking.create({
      userId,
      trainId,
      seatClass,
      date,
    });

    // Update available seats
    train.seatsAvailable -= 1;
    await train.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Error booking train:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}


// Get bookings for a user
export async function getUserBookings(req, res) {
  const userId = req.params.id;

  try {
    const bookings = await Booking.findAll({
      where: { userId },
      include: [
        {
          model: Train,
          attributes: ["name", "source", "destination"],
        },
      ],
    });

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}


// Cancel a booking
export async function cancelBooking(req, res) {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const train = await Train.findByPk(booking.train_id);
    if (train) {
      train.seats_available += booking.seats_booked;
      await train.save();
    }

    await booking.destroy();

    res.json({ message: "Booking canceled successfully" });
  } catch (err) {
    console.error("Error canceling booking:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}
