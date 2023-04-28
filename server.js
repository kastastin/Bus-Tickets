require("dotenv").config();

const express = require("express");
const DBConfig = require("./config/dbConfig");

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);

app.listen(port, () => console.log(`Server is working on port ${port}`));
