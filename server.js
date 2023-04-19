require("dotenv").config();

const express = require("express");
const DBConfig = require("./config/dbConfig");

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());

const usersRoute = require("./routes/usersRoute");

app.use("/api/users", usersRoute);
app.listen(port, () => console.log(`Server is working on port ${port}`));
