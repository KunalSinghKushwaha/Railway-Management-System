import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Booking from "./Components/bookings/Booking";
import TrainList from "./Components/trains/TrainList";
import TrainDetails from "./Components/trains/TrainDetails";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css"; // Import only CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import only if using Bootstrap JS components

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/trains" element={<TrainList />} />
          <Route path="/trains/:id" element={<TrainDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
