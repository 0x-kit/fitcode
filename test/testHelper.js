/**
 * Initial setup for the tests
 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before('Tells mongoose to conect to mongo', (done) => {

    mongoose.connect('mongodb://localhost/fitcode_test');
    mongoose.connection
        .once('open', () => { done() })
        .on('error', (error) => {
            console.warn('Warning', error)
        });
});

beforeEach('Drops collections before each test', (done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});