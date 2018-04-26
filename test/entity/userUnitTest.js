const expect = require('chai').expect;
const assert = require('assert');
const factories = require('../dataset/userFactory');
const User = require('../../models/user');

describe('Entity test - User', () => {
    let user;

    it('should be invalid if name is empty', (done) => {

        user = factories.emptyUserName();

        user.validate((err) => {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if password is empty', (done) => {

        user = factories.emptyUserPassword();

        user.validate((err) => {
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it('should be invalid if email is empty', (done) => {

        user = factories.emptyUserEmail();

        user.validate((err) => {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if name is shorter than 2 characters', (done) => {

        user = factories.invalidUserName();

        user.validate((err) => {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if password is shorter than 5 characters', (done) => {

        user = factories.invalidUserPassword();

        user.validate((err) => {
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it('should be invalid if email does not match the format', (done) => {

        user = factories.invalidUserEmail();

        user.validate((err) => {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be valid if (name,password,email) match the correct format', (done) => {

        user = factories.validUser();

        user.validate((err) => {
            assert(err === null);
            done();
        });
    });
    
});