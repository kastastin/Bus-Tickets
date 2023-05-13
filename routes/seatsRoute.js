const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const authMiddleware = require("../middlewares/authMiddleware");
const Seat = require("../models/seatsModel");
const Bus = require("../models/busesModel");

// <-- Booking Seat -->
router.post("/book-seat", authMiddleware, async (request, response) => {
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
router.post("/stripe-payment", authMiddleware, async (request, response) => {
  try {
    console.log(request.body.price);
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

    if (stripePayment) {
      response.status(200).send({
        success: true,
        message: "Stripe Payment was successful",
        data: { transactionId: stripePayment.source.id },
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Stripe Payment was failed",
        data: error,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Stripe Payment was failed",
      data: error,
    });
  }
});

module.exports = router;
