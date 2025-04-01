import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Profile = () => {
  const { user } = useContext(AuthContext); // Get authenticated user
  const [bookings, setBookings] = useState([]); // State to store user bookings
  const [error, setError] = useState("");

  // ✅ Use useCallback to prevent unnecessary re-creation of fetchBookings
  const fetchBookings = useCallback(async () => {
    if (!user) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`);
      setBookings(response.data);
    } catch (err) {
      setError("Failed to load bookings.");
    }
  }, [user]); // ✅ Dependency: `user`

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]); // ✅ No more warning!

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        {/* Profile Header */}
        <div className="card-header bg-primary text-white text-center">
          <h2>User Profile</h2>
        </div>

        {/* Profile Body */}
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* User Information */}
          <div className="mb-4 text-center">
            <h4>{user?.name}</h4>
            <p className="text-muted">{user?.email}</p>
          </div>

          {/* Booking History */}
          <h5 className="mb-3">Your Bookings</h5>
          {bookings.length > 0 ? (
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Train Name</th>
                  <th>Seats</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td>{index + 1}</td>
                    <td>{booking.trainName}</td>
                    <td>{booking.seats}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
