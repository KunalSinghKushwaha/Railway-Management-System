import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import axios from "axios"; // Import Axios for API calls

const TrainList = () => {
  // State to store train data
  const [trains, setTrains] = useState([]);

  // Fetch train data from the backend
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trains");
        setTrains(response.data);
      } catch (error) {
        console.error("Error fetching train data:", error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div className="container mt-5">
      {/* Page Title */}
      <h2 className="text-center text-primary mb-4">Available Trains</h2>

      {/* Train List Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Train Name</th>
              <th>Train Number</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Seats Available</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {trains.length > 0 ? (
              trains.map((train) => (
                <tr key={train.id}>
                  <td>{train.name}</td>
                  <td>{train.number}</td>
                  <td>{train.departure}</td>
                  <td>{train.arrival}</td>
                  <td>{train.seatsAvailable}</td>
                  <td>₹{train.fare}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-danger">
                  No trains available at the moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainList;
