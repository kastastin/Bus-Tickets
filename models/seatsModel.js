const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    bus: {
      ref: "Bus",
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    seats: {
      type: Array,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("seats", seatSchema);
