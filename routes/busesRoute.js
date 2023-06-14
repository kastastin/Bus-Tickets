const router = require("express").Router();
const Bus = require("../models/busesModel");
const authMiddleware = require("../middlewares/authMiddleware");

const createResponse = function (msg, data, status) {
  return {
    success: status,
    message: msg,
    data: data,
  };
};

// <-- Get Buses -->
router.post("/get-buses", authMiddleware(false), async (request, response) => {
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

// <-- Get Bus By ID -->
router.post(
  "/get-bus-by-id",
  authMiddleware(false),
  async (request, response) => {
    try {
      const bus = await Bus.findById(request.body._id);

      return response
        .status(200)
        .send(createResponse("Bus was fetched successfully", bus, true));
    } catch (error) {
      response.status(500).send({ success: false, message: error.message });
    }
  }
);

// <-- Add New Bus -->
router.post("/add-bus", authMiddleware(true), async (request, response) => {
  try {
    const isBusExist = await Bus.findOne({ number: request.body.number });
    if (isBusExist)
      return response.status(200).send({
        success: false,
        message: "Bus with this number is already created.",
      });

    const newBus = new Bus(request.body);
    await newBus.save();

    return response
      .status(200)
      .send({ success: true, message: "New bus was created successfully" });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Edit Bus -->
router.post("/edit-bus", authMiddleware(true), async (request, response) => {
  try {
    await Bus.findByIdAndUpdate(request.body._id, request.body);

    return response.status(200).send({
      success: true,
      message: "Bus was edited successfully",
    });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Remove Bus -->
router.post("/remove-bus", authMiddleware(true), async (request, response) => {
  try {
    await Bus.findByIdAndDelete(request.body._id);

    return response
      .status(200)
      .send(createResponse("Bus was removed successfully", null, true));
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
