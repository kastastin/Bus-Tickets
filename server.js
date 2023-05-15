require("dotenv").config();

const express = require("express");
const DBConfig = require("./config/dbConfig");

const app = express();
const port = process.env.PORT || 5002;
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const seatsRoute = require("./routes/seatsRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/seats", seatsRoute);

app.listen(port, () => console.log(`Server is working on port ${port}`));
