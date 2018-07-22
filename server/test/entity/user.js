const expect = require('chai').expect;
const assert = require('assert');
const User = require('../../models/user');

describe('Entity test - User', () => {
  let user;

  it('should be invalid if name is empty', done => {
    user = new User({ email: 'test@test.com', password: 'password' });

    user.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', done => {
    user = new User({ name: 'tester', email: 'test@test.com' });

    user.validate(err => {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it('should be invalid if email is empty', done => {
    user = new User({ name: 'tester', password: 'password' });

    user.validate(err => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if name is shorter than 2 characters', done => {
    user = new User({
      name: 'tt',
      email: 'test@test.com',
      password: 'password'
    });

    user.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if password is shorter than 5 characters', done => {
    user = new User({
      name: 'tt',
      email: 'test@test.com',
      password: 'pass'
    });

    user.validate(err => {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it('should be invalid if email does not match the format', done => {
    user = new User({
      name: 'tt',
      email: 'testtest.com',
      password: 'password'
    });

    user.validate(err => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be valid if (name,password,email) match the correct format', done => {
    user = new User({
      name: 'user',
      email: 'idoexist@test.com',
      password: 'password'
    });

    user.validate(err => {
      assert(err === null);
      done();
    });
  });
});
