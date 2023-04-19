const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    response.send({
      success: true,
      message: "New user was created successfully",
      data: null,
    });
  } catch (error) {
    response.send({
      success: false,
      message: error.message,
      data: null,
    });
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
      return response.send({
        success: false,
        message: "Entered password is incorrect",
        data: null,
      });
    }

    const token = jwt.sign(
      { userID: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    response.send({
      success: true,
      message: "User login successfully",
      data: token,
    });
  } catch (error) {
    response.send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

// <-- Get User By Id -->

module.exports = router;
