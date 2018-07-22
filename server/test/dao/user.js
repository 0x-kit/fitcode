const assert = require('assert');
const User = require('../../models/user');

describe('DAO test - User', () => {
  beforeEach('adds user for testing', done => {
    existent = new User({
      name: 'user',
      email: 'idoexist@test.com',
      password: 'password'
    });
    nonExistent = new User({
      _id: '5ae328a947c1c91862ad1c90',
      name: 'userx',
      email: 'idontexist@gmail.com',
      password: 'password'
    });
    existent.save().then(() => done());
  });

  it('saves an user', done => {
    user = new User({
      name: 'user',
      email: 'idoexist2@test.com',
      password: 'password'
    });
    user.save().then(() => {
      assert(!user.isNew);
      done();
    });
  });

  it('finds an user with a existent email', done => {
    User.findOne({ email: existent.email }).then(user => {
      assert(user.name === 'user');
      done();
    });
  });

  it("doesn't find an user if non existent email", done => {
    User.findOne({ email: nonExistent.email }).then(user => {
      assert(user === null);
      done();
    });
  });

  it('finds an user with an existent id', done => {
    User.findById(existent._id).then(user => {
      assert(user.name === 'user');
      done();
    });
  });

  it("doesn't find an user if non existent id", done => {
    User.findOne({ email: nonExistent._id }).then(user => {
      assert(user === null);
      done();
    });
  });

  it('updates an user with an existent id', done => {
    User.findByIdAndUpdate(existent._id, { name: 'existentUserchanged' })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'existentUserchanged');
        done();
      });
  });

  it("doesn't update an user if non existent id", done => {
    User.findByIdAndUpdate(nonExistent._id, {
      name: 'nonExistentUserchanged'
    })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name !== 'nonExistentUserchanged');
        done();
      });
  });

  it('deletes an user with an existent id', done => {
    User.remove({ _id: existent._id })
      .then(() => User.findById(existent._id))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("doesn't delete if non existent id", done => {
    User.remove({ _id: nonExistent._id })
      .then(() => User.findById(nonExistent._id))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
