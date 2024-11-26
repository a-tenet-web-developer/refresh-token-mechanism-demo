const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

module.exports = app;
