const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const keys = require('./config/keys');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth2');
const productRoutes = require('./routes/product');
const diaryRoutes = require('./routes/diary');

const passport = require('passport');
const passportConfig = require('./services/passport2');

mongoose.connect(keys.mongoURI);

//require('./seed');
/** Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

/** Routes which should handle requests */
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/diary', diaryRoutes);

/** If none of the routes above handle the request */

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets like  -main.js file- or -main.css file-
  app.use(express.static('client/build'));

  // Expres will serve up the -index.html file- if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  const error = new Error('Not found');
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
