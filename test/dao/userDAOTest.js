const assert = require('assert');
const User = require('../../models/user');
const factories = require('../dataset/userFactory');

describe('DAO test - User', () => {

    beforeEach('adds user for testing', (done) => {

        user1 = factories.validUser();
        user2 = factories.invalidUserId();
        user3 = factories.invalidUserEmail();

        user1.save()
            .then(() => done());

    });


    it('saves an user', (done) => {

        user = factories.validUser();

        user.save()
            .then(() => {
                assert(!user.isNew);
                done();
            });
    });

    it('finds an user with a valid email', (done) => {
        User.findOne({ email: user1.email })
            .then((user) => {
                assert(user.name === 'user');
                done();
            });
    });

    it('finds an user with a valid id', (done) => {
        User.findById(user1._id)
            .then((user) => {
                assert(user.name === 'user');
                done();
            });
    });


    it('updates an user with a valid id', (done) => {
        User.findByIdAndUpdate(user1._id, { name: 'user1changed' })
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'user1changed');
                done();
            })

    });

    it('deletes an user with a valid id', (done) => {
        User.remove({ _id: user1._id })
            .then(() => User.findById(user1._id))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('should be invalid if non existent id', (done) => {
        User.remove({ _id: user2._id })
            .then(() => User.findById(user2._id))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

});
