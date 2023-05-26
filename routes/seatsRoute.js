const router = require("express").Router(); 
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const authMiddleware = require("../middlewares/authMiddleware");
const Seat = require("../models/seatsModel");
const Bus = require("../models/busesModel");

// <-- Get Reserved Seats By User ID -->
router.post(
  "/get-seats-by-user-id",
  authMiddleware(false),
  async (request, response) => {
    try {
      const reservedSeats = await Seat.find({ user: request.body.userID })
        .populate("bus")
        .populate("user");

      response.status(200).send({
        success: true,
        message: "Reserved seats were fetched successfully",
        data: reservedSeats,
      });
    } catch (error) {
      response.status(500).send({
        success: false,
        message: "Reserved seats fetching was failed",
        data: error,
      });
    }
  }
);

// <-- Remove Reserved Seats By ID -->
router.post("/remove-seats", authMiddleware(false), async (request, response) => {
  try {
    await Seat.findByIdAndDelete(request.body._id);

    return response.status(200).send({
      success: true,
      message: "Old reservation was successfully deleted",
    });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Booking Seat -->
router.post("/book-seat", authMiddleware(false), async (request, response) => {
  try {
    const newSeatBooking = new Seat({
      ...request.body,
      user: request.body.userID,
    });
    await newSeatBooking.save();

    const bus = await Bus.findById(request.body.bus);
    bus.reservedSeats = [...bus.reservedSeats, ...request.body.seats];
    await bus.save();

    response.status(200).send({
      success: true,
      message: "Booking seats was successful",
      data: newSeatBooking,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Booking seats was failed",
      data: error,
    });
  }
});

// <-- Create Stripe Payment -->
router.post("/stripe-payment", authMiddleware(false), async (request, response) => {
  try {
    const { token, price } = request.body;

    const customers = await stripe.customers.create({
      source: token.id,
      email: token.email,
    });

    const stripePayment = await stripe.charges.create(
      {
        currency: "usd",
        customer: customers.id,
        receipt_email: token.email,
        amount: price,
      },
      { idempotencyKey: uuidv4() }
    );

    stripePayment
      ? response.status(200).send({
          success: true,
          message: "Stripe payment was successful",
          data: { transactionId: stripePayment.source.id },
        })
      : res.status(500).send({
          success: false,
          message: "Stripe payment was failed",
          data: error,
        });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Stripe Payment was failed",
      data: error,
    });
  }
});

module.exports = router;
