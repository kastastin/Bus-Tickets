const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const authMiddleware = require("../middlewares/authMiddleware");
const Seat = require("../models/seatsModel");
const Bus = require("../models/busesModel");

const createResponse = function (msg, data, status) {
  return {
    success: status,
    message: msg,
    data: data,
  };
};

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
      response
        .status(500)
        .send(
          createResponse("Reserved seats fetching was failed", error, false)
        );
    }
  }
);

// <-- Remove Reserved Seats By ID -->
router.post(
  "/remove-seats",
  authMiddleware(false),
  async (request, response) => {
    try {
      await Seat.findByIdAndDelete(request.body._id);

      return response.status(200).send({
        success: true,
        message: "Old reservation was successfully deleted",
      });
    } catch (error) {
      response.status(500).send({ success: false, message: error.message });
    }
  }
);

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

    response
      .status(200)
      .send(
        createResponse("Booking seats was successful", newSeatBooking, true)
      );
  } catch (error) {
    response
      .status(500)
      .send(createResponse("Booking seats was failed", error, false));
  }
});

// <-- Create Stripe Payment -->
router.post(
  "/stripe-payment",
  authMiddleware(false),
  async (request, response) => {
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
        : response
            .status(500)
            .send(createResponse("Stripe payment was failed", error, false));
    } catch (error) {
      response
        .status(500)
        .send(createResponse("Stripe payment was failed", error, false));
    }
  }
);

// <-- Stripe Identify -->

router.post(
  "/create-verification-session",
  authMiddleware(false),
  async (request, response) => {
    try {
      const verificationSession =
        await stripe.identity.verificationSessions.create({
          type: "document",
          metadata: {
            user_id: request.body.userID,
          },
        });

      const clientSecret = verificationSession.client_secret;

      response.status(200).send({
        success: true,
        message: "Verification session created",
        data: { clientSecret },
      });
    } catch (error) {
      response.status(500).send({
        success: false,
        message: "Failed to create verification session",
        data: error,
      });
    }
  }
);

module.exports = router;
