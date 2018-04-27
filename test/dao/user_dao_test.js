const assert = require('assert');
const User = require('../../models/user');
const factories = require('../dataset/user_factory');

describe('DAO test - User', () => {

    beforeEach('adds user for testing', (done) => {

        existentUser = factories.existentUser();
        nonExistentUser = factories.nonExistentUser();

        existentUser.save()
            .then(() => done());

    });
    
    /** ADD **/
    it('saves an user', (done) => {
        user = factories.existentUser();

        user.save()
            .then(() => {
                assert(!user.isNew);
                done();
            });
    });

    /** READ **/
    it('finds an user with a existent email', (done) => {
        User.findOne({ email: existentUser.email })
            .then((user) => {
                assert(user.name === 'user');
                done();
            });
    });

    it('doesn\'t find an user if non existent email', (done) => {
        User.findOne({ email: nonExistentUser.email })
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('finds an user with a existent id', (done) => {
        User.findById(existentUser._id)
            .then((user) => {
                assert(user.name === 'user');
                done();
            });
    });

    it('doesn\'t find an user if non existent id', (done) => {
        User.findOne({ email: nonExistentUser._id })
            .then((user) => {
                assert(user === null);
                done();
            });
    });


    /** UPDATE **/
    it('updates an user with a existent id', (done) => {
        User.findByIdAndUpdate(existentUser._id, { name: 'existentUserchanged' })
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'existentUserchanged');
                done();
            })

    });

    it('doesn\'t update an user if non existent id', (done) => {
        User.findByIdAndUpdate(nonExistentUser._id, { name: 'nonExistentUserchanged' })
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name !== 'nonExistentUserchanged');
                done();
            })

    });

    /** DELETE **/
    it('deletes an user with a existent id', (done) => {
        User.remove({ _id: existentUser._id })
            .then(() => User.findById(existentUser._id))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('doesn\'t delete if non existent id', (done) => {
        User.remove({ _id: nonExistentUser._id })
            .then(() => User.findById(nonExistentUser._id))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

});
