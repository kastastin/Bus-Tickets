const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const sendError = () => {
    response.status(401).send({
      success: false,
      message: "Authorization is failed",
    });
  };

  try {
    const token = request.headers.authorization.split(" ")[1];
    if (!token) sendError();

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.body.userID = decryptedToken.userID;
    next();
  } catch (error) {
    sendError();
  }
};
