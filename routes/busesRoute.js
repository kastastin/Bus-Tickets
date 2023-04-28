const router = require("express").Router();

const Bus = require("../models/busesModel");
const authMiddleware = require("../middlewares/authMiddleware");

// <-- Add New Bus -->
router.post("/add-bus", async (request, response) => {
  try {
    const isBusExist = await Bus.findOne({ number: request.body.number });
    if (isBusExist) {
      return response.status(200).send({
        success: false,
        message: "Bus with this number is already created.",
      });
    }

    const newBus = new Bus(request.body);
    await newBus.save();

    return response
      .status(200)
      .send({ success: true, message: "New bus was created successfully" });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
