const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Train = require("./Train");

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

module.exports = Booking;
