import axios from "axios";

// Base URL for API requests
const API_URL = "http://localhost:5000/api"; // Change if your backend runs on a different port

// ✅ Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error);
    throw error;
  }
};

// ✅ Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error);
    throw error;
  }
};

// ✅ Fetch all trains
export const fetchTrains = async () => {
  try {
    const response = await axios.get(`${API_URL}/trains`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trains:", error.response?.data || error);
    throw error;
  }
};

// ✅ Fetch details of a specific train by ID
export const fetchTrainDetails = async (trainId) => {
  try {
    const response = await axios.get(`${API_URL}/trains/${trainId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching train details:", error.response?.data || error);
    throw error;
  }
};

// ✅ Book a train ticket
export const bookTrain = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error booking train:", error.response?.data || error);
    throw error;
  }
};

// ✅ Fetch all user bookings
export const fetchUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error.response?.data || error);
    throw error;
  }
};

// ✅ Fetch all bookings (Admin use)
export const fetchAllBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error.response?.data || error);
    throw error;
  }
};

// ✅ Cancel a booking
export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error.response?.data || error);
    throw error;
  }
};
