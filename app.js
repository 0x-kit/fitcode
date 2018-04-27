const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

const morgan = require('morgan');


if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/fitcode');

    /** Log utility */
    app.use(morgan('dev'));
}

/** Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


routes(app);

/** If none of the routes above handle the request */
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