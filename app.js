const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const keys = require("./config/keys");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const passport = require("passport");
const passportConfig = require("./services/passport");

mongoose.connect(keys.mongoURI);

/** Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

/** CORS error-handling */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/** Routes which should handle requests */
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to fitcode" });
});
app.use("/user", userRoutes);
app.use("/", authRoutes);

// /**Prueba auth */
// const checkAuth = require('./services/jwt').checkAuth;
// app.get('/', checkAuth, (req, res) => {
//   res.json({ user: req.authData, message: 'Private route' });
// });

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
