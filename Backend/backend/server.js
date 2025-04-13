import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {sequelize,connectDB } from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import trainroutes from "./routes/trainroutes.js";
import bookingroutes from "./routes/bookingroutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trains", trainroutes);
app.use("/api/bookings", bookingroutes);

app.get("/", (_req, res) => {
  res.send("Railway Management System API is Running...");
});

// Server setup
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    sequelize.sync({ alter: true })
      .then(() => {
        console.log(" Database Synchronized");
        app.listen(PORT, () => {
          console.log(` Server running on http://localhost:${PORT}`);
        });
      })
      .catch((error) => console.error(" Error syncing database:", error.message));
  })
  .catch((error) => console.error(" Database Connection Failed:", error.message));
