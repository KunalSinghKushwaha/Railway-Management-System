import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Booking = () => {
  const { trainId } = useParams(); // Get train ID from route parameters
  const navigate = useNavigate(); // For navigation after booking

  // State for user inputs
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    seats: 1,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`http://localhost:5000/api/bookings`, {
        trainId,
        ...bookingDetails,
      });

      if (response.status === 201) {
        setSuccessMessage("✅ Booking Successful!");
        setTimeout(() => navigate("/"), 2000); // Redirect to home page after booking
      }
    } catch (err) {
      setError("❌ Booking failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white text-center">
          <h3>Train Booking</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={bookingDetails.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={bookingDetails.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Number of Seats</label>
              <input
                type="number"
                name="seats"
                className="form-control"
                value={bookingDetails.seats}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Book Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
