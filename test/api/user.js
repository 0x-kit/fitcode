const assert = require('assert');
User = require('../../models/user');
const request = require('supertest');
const app = require('../../app');
const factories = require('../dataset/user_factory');


describe('API test - User', () => {
    let user, user1;

    beforeEach((done) => {
        user = factories.existentUser();
        user1 = factories.existentUser();

        Promise.all([user.save(), user1.save()])
            .then(() => done());
    });

    it('GET request to /user retrieves all users', (done) => {
        request(app) //express app
            .get('/user')
            .end((err, response) => {
                assert(response.body.response.users.length === 2);
                done();
            });
    });

    it('GET request to /user/id finds an user', (done) => {
        request(app) //express app
            .get(`/user/${user._id}`)
            .end((err, response) => {
                const res = response.body;
                assert(res.user !== null);
                assert(res.user._id.toString() === user._id.toString());
                done();
            });
    });

    it('POST to /user creates a new user', (done) => {
        User.count().then(count => {
            request(app)
                .post('/user')
                .send(factories.existentUser())
                .end((err, response) => {
                    User.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('DELETE to /user/id deletes an existing user', done => {
        request(app)
            .delete(`/user/${user._id}`)
            .end((err, response) => {
                User.findOne({ _id: user._id })
                    .then((user) => {
                        assert(user === null)
                        done();
                    })
            })
    });

});