require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize, connectDB } = require("./config/db"); // Import database connection
const authRoutes = require("./routes/authroutes"); // Import authentication routes

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" })); // Allow frontend to communicate with backend
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use("/api/auth", authRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Railway Management System API is Running...");
});

// Start Server & Connect to Database
const PORT = process.env.PORT || 5000;

connectDB() // Connect to the database
  .then(() => {
    sequelize.sync({ alter: true }) // Sync models to database
      .then(() => {
        console.log("✅ Database Synchronized");
        app.listen(PORT, () => {
          console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
      })
      .catch((error) => console.error("❌ Error syncing database:", error.message));
  })
  .catch((error) => console.error("❌ Database Connection Failed:", error.message));
