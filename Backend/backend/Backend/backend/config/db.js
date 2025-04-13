const { Sequelize } = require("sequelize");
require("dotenv").config();

// Debugging: Check if the password is loading correctly

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✔ Loaded" : "❌ Not Loaded");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_DIALECT:", process.env.DB_DIALECT);

// Create a Sequelize instance for PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Database user
  process.env.DB_PASSWORD || "default_password",  // Ensure it's a string
  {  // Options object starts here
    host: process.env.DB_HOST,   
    dialect: process.env.DB_DIALECT || "postgres", // Explicitly set the dialect
    port: process.env.DB_PORT || 5432, // Ensure port is set
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
  }
};

module.exports = { sequelize, connectDB };
