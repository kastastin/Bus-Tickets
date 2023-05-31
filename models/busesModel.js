const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  departureTown: {
    type: String,
    required: true,
  },
  departureCoords: {
    type: Array,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  arrivalTown: {
    type: String,
    required: true,
  },
  arrivalCoords: {
    type: Array,
    required: true,
  },
  arrivalDate: {
    type: String,
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  driverContacts: {
    type: String,
    required: true,
  },
  isDriverIdentified: {
    type: Boolean,
    required: false,
  },
  reservedSeats: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("buses", busSchema);
