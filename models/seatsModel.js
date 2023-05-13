const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    user: {
      ref: "users",
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    bus: {
      ref: "buses",
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
    timestamps: true,
  }
);

module.exports = mongoose.model("seats", seatSchema);
