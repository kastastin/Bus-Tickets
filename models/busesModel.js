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
  reservedSeats: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    default: "Ready to go",
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
  // number: {
  //   type: String,
  //   required: true,
  // },
  // capacity: {
  //   type: Number,
  //   required: true,
  // },
  // from: {
  //   type: String,
  //   required: true,
  // },
  // to: {
  //   type: String,
  //   required: true,
  // },
  // travelDate: {
  //   type: String,
  //   required: true,
  // },
  // departure: {
  //   type: String,
  //   required: true,
  // },
  // arrival: {
  //   type: String,
  //   required: true,
  // },
  // type: {
  //   type: String,
  //   required: true,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  // reservedSeats: {
  //   type: Array,
  //   default: [],
  // },
  // status: {
  //   type: String,
  //   default: "Ready to go",
  // },
});

module.exports = mongoose.model("buses", busSchema);
