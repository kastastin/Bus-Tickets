const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const createResponse = function (msg, data, status) {
  return {
    success: status,
    message: msg,
    data: data,
  };
};

// <-- Get Users -->
router.post("/get-users", authMiddleware(true), async (request, response) => {
  try {
    const users = await User.find();

    return response
      .status(200)
      .send(createResponse("Users were fetched successfully", users, true));
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Get User By ID -->
router.post(
  "/get-user-by-id",
  authMiddleware(false),
  async (request, response) => {
    try {
      const user = await User.findById(request.body.userID);
      response.send(createResponse("User was found", user, true));
    } catch (error) {
      response.send(createResponse(error.message, null, false));
    }
  }
);

// <-- Edit User -->
router.post("/edit-user", authMiddleware(true), async (request, response) => {
  try {
    await User.findByIdAndUpdate(request.body._id, request.body);

    return response
      .status(200)
      .send(createResponse("User was edit successfully", null, true));
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Create New User -->
router.post("/sign-up", async (request, response) => {
  try {
    const isUserExist = await User.findOne({ email: request.body.email });
    if (isUserExist) {
      return response.send({
        success: false,
        message: "User with this email is already registered.",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    request.body.password = hashedPassword;

    const newUser = new User(request.body);
    await newUser.save();

    response.send(createResponse("User was created successfully", null, true));
  } catch (error) {
    response.send(createResponse(error.message, null, false));
  }
});

// <-- Login User -->
router.post("/log-in", async (request, response) => {
  try {
    const existingUser = await User.findOne({ email: request.body.email });

    if (!existingUser) {
      return response.send({
        success: false,
        message: "User with this email does not registered",
        data: null,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      request.body.password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return response.send(
        createResponse("Entered password is incorrect", null, false)
      );
    }

    if (existingUser.isBlocked) {
      return response.send({
        success: false,
        message: "User with this email was blocked",
        data: null,
      });
    }

    const token = jwt.sign(
      { userID: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    response.send(createResponse("User login successfully", token, true));
  } catch (error) {
    createResponse(error.message, null, false);
  }
});

module.exports = router;
