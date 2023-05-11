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

// <-- Get Buses -->
router.post("/get-buses", authMiddleware, async (request, response) => {
  try {
    const buses = await Bus.find();

    return response.status(200).send({
      success: true,
      message: "Buses were fetched successfully",
      data: buses,
    });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Get Bus -->
router.post("/get-bus-by-id", authMiddleware, async (request, response) => {
  try {
    const bus = await Bus.findById(request.body._id);

    return response.status(200).send({
      success: true,
      message: "Bus was fetched successfully",
      data: bus,
    });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Edit Bus -->
router.post("/edit-bus", authMiddleware, async (request, response) => {
  try {
    await Bus.findByIdAndUpdate(request.body._id, request.body);

    return response.status(200).send({
      success: true,
      message: "Bus was edit successfully",
    });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Delete Bus -->
router.post("/remove-bus", authMiddleware, async (request, response) => {
  try {
    await Bus.findByIdAndDelete(request.body._id);

    return response.status(200).send({
      success: true,
      message: "Bus was removed successfully",
    });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
