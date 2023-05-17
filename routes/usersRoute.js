const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// <-- Get Users -->
router.post("/get-users", authMiddleware, async (request, response) => {
  try {
    const users = await User.find();

    return response.status(200).send({
      success: true,
      message: "Users were fetched successfully",
      data: users,
    });
  } catch (error) {
    response.status(500).send({ success: false, message: error.message });
  }
});

// <-- Get User By ID -->
router.post("/get-user-by-id", authMiddleware, async (request, response) => {
  try {
    const user = await User.findById(request.body.userID);
    response.send({
      success: true,
      message: "User was found",
      data: user,
    });
  } catch (error) {
    response.send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

// <-- Edit User -->
router.post("/edit-user", authMiddleware, async (request, response) => {
  try {
    await User.findByIdAndUpdate(request.body._id, request.body);

    return response.status(200).send({
      success: true,
      message: "User was edit successfully",
    });
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

    if (existingUser.isBlocked) {
      return response.send({
        success: false,
        message: "User with this email was blocked",
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

module.exports = router;
