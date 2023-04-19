const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");

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

module.exports = router;
