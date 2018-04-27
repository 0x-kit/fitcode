const assert = require('assert');
/** package that help us to make/simulate fake http request */
const request = require('supertest');
const app = require('../../app');


describe('Api welcome test', () => {
    it('handles a GET request to /api', (done) => {
        request(app) //express app
            .get('/api')
            .end((err, response) => {
                assert(response.body.message === 'Welcome to fitcode');
                done();
            });
    });
});