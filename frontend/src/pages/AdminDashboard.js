import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const AdminDashboard = () => {
  const [trains, setTrains] = useState([]); // State to store train list
  const [trainName, setTrainName] = useState(""); // Train name input
  const [seats, setSeats] = useState(""); // Number of seats input
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrains();
  }, []);

  // Fetch all trains from backend
  const fetchTrains = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/trains");
      setTrains(response.data);
    } catch (err) {
      setError("Failed to load trains.");
    }
  };

  // Add a new train
  const addTrain = async () => {
    if (!trainName || !seats) return alert("All fields are required!");
    try {
      const response = await axios.post("http://localhost:5000/api/trains", {
        name: trainName,
        seats: Number(seats),
      });
      setTrains([...trains, response.data]);
      setTrainName("");
      setSeats("");
    } catch (err) {
      setError("Failed to add train.");
    }
  };

  // Delete a train
  const deleteTrain = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trains/${id}`);
      setTrains(trains.filter((train) => train.id !== id));
    } catch (err) {
      setError("Failed to delete train.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        {/* Admin Dashboard Header */}
        <div className="card-header bg-dark text-white text-center">
          <h2>Admin Dashboard</h2>
        </div>

        {/* Admin Dashboard Body */}
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Add Train Form */}
          <div className="mb-4">
            <h5>Add New Train</h5>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Train Name"
                value={trainName}
                onChange={(e) => setTrainName(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Seats Available"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
              <button className="btn btn-primary" onClick={addTrain}>
                Add Train
              </button>
            </div>
          </div>

          {/* Train List Table */}
          <h5>Manage Trains</h5>
          {trains.length > 0 ? (
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Train Name</th>
                  <th>Seats Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train, index) => (
                  <tr key={train.id}>
                    <td>{index + 1}</td>
                    <td>{train.name}</td>
                    <td>{train.seats}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTrain(train.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No trains available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
