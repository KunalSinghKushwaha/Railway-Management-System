const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Train = sequelize.define("Train", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  arrivalTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  seatsAvailable: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fare: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Train;
