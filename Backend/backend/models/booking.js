import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

import User from "./user.js";
import Train from "./train.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
   autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: "id",
    },
    onDelete: "CASCADE",
  },
  trainId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Train, 
      key: "id",
    },
    onDelete: "CASCADE",
  },
  seatClass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
    defaultValue: "pending",
  },
});
Booking.belongsTo(Train, {
  foreignKey: "trainId", // Booking references the train via trainId
  onDelete: "CASCADE", // If a train is deleted, delete its bookings
});

export default Booking;
