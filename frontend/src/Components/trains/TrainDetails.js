import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get train ID from URL
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const TrainDetails = () => {
  const { id } = useParams(); // Get train ID from route parameters
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch train details from API
  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trains/${id}`);
        setTrain(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch train details.");
        setLoading(false);
      }
    };

    fetchTrainDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading train details...</h4></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      {/* Train Details Card */}
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3>{train.name} ({train.number})</h3>
        </div>
        <div className="card-body">
          <h5 className="text-secondary">Train Information</h5>
          <ul className="list-group">
            <li className="list-group-item"><strong>Departure:</strong> {train.departure}</li>
            <li className="list-group-item"><strong>Arrival:</strong> {train.arrival}</li>
            <li className="list-group-item"><strong>Seats Available:</strong> {train.seatsAvailable}</li>
            <li className="list-group-item"><strong>Fare:</strong> ₹{train.fare}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainDetails;
