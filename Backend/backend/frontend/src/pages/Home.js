import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Home = () => {
  return (
    <div className="container text-center mt-5">
      {/* Header Section */}
      <h1 className="display-4 text-primary">Welcome to Railway Management System</h1>
      <p className="lead text-muted">Book your train tickets easily and manage your travel!</p>

      {/* Navigation Buttons */}
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary btn-lg mx-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-success btn-lg mx-2">
          Register
        </Link>
      </div>

      {/* Image Section */}
      <div className="mt-5">
      <img
    src="/images/train.jpg.avif" // Load image from public folder
    alt="Train"
    className="img-fluid rounded shadow"
    style={{ maxWidth: "50%", height: "auto" }}
  />
      </div>
    </div>
  );
};

export default Home;
