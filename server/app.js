const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const keys = require("./config/keys");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth2");

const passport = require("passport");
const passportConfig = require("./services/passport2");

mongoose.connect(keys.mongoURI);

/** Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

/** Routes which should handle requests */
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

/** If none of the routes above handle the request */
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
