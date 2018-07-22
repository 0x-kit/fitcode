const request = require('supertest');
const app = require('../../app');

User = require('../../models/user');

describe.only('API test - User', () => {
  let user, user1, error;

  beforeEach(async () => {
    user = new User({
      name: 'user',
      email: 'idoexist@test.com',
      password: 'password'
    });
    user1 = new User({
      name: 'user',
      email: 'idoexist2@test.com',
      password: 'password'
    });

    await User.deleteMany({ _id: { $in: [user._id, user1._id] } });
    await user.save();
    await user1.save();
  });

  it('GET request to /user retrieves all users', async () => {
    const response = await request(app)
      .get('/api/user')
      .expect(200);
  });

  it('GET request to /user/id finds an user', async () => {
    const response = await request(app)
      .get(`/api/user/${user._id}`)
      .expect(200);
  });

  it("GET request to /user/invalidId doesn't find an user", async () => {
    const invalidID = new User({
      _id: '5ae5a212700aa219f82e54e1',
      name: 'tt',
      email: 'testtest.com',
      password: 'pass'
    });
    const response = await request(app)
      .get(`/api/user/${invalidID._id}`)
      .expect(404);
  });

  it('POST to /user creates an user', async () => {
    const newUser = new User({
      name: 'user',
      email: 'imnew@test.com',
      password: 'password'
    });
    const response = await request(app)
      .post('/api/user')
      .send(newUser)
      .expect(201);
  });

  it("POST to /user with missing name doesn't create an user", async () => {
    const missingName = new User({
      email: 'test@test.com',
      password: 'password'
    });
    const response = await request(app)
      .post('/api/user')
      .send(missingName)
      .expect(422);
  });

  it("POST to /user with missing email doesn't create an user", async () => {
    const missingEmail = new User({ name: 'tester', password: 'password' });
    const response = await request(app)
      .post('/api/user')
      .send(missingEmail)
      .expect(422);
  });

  it("POST to /user with missing password doesn't create an user", async () => {
    const missingPassword = new User({
      name: 'tester',
      email: 'test@test.com'
    });
    const response = await request(app)
      .post('/api/user')
      .send(missingPassword)
      .expect(422);
  });

  it('PUT to /user/id updates an existing user', async () => {
    const updatedProps = { name: 'userupdated' };
    const response = await request(app)
      .put(`/api/user/${user._id}`)
      .send(updatedProps)
      .expect(200);
  });

  it("PUT to /user/invalidId doesn't update an existing user", async () => {
    const updatedProps = { name: 'userupdated' };
    const invalidID = new User({
      _id: '5ae5a212700aa219f82e54e1',
      name: 'tt',
      email: 'testtest.com',
      password: 'pass'
    });

    const response = await request(app)
      .put(`/api/user/${invalidID._id}`)
      .send(updatedProps)
      .expect(404);
  });

  it("PUT to /user/id with invalid name doesn't update an existing user", async () => {
    const updatedProps = { name: 'tt' };

    const response = await request(app)
      .put(`/api/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it("PUT to /user/id with invalid email doesn't update an existing user", async () => {
    const updatedProps = { email: 'testtest.com' };

    const response = await request(app)
      .put(`/api/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it("PUT to /user/id with invalid password doesn't update an existing user", async () => {
    const updatedProps = { password: 'pass' };

    const response = await request(app)
      .put(`/api/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it('DELETE to /user/id deletes an existing user', async () => {
    const response = await request(app)
      .delete(`/api/user/${user._id}`)
      .expect(200);
  });

  it("DELETE to /user/invalidId doesn't delete an existing user", async () => {
    const invalidID = new User({
      _id: '5ae5a212700aa219f82e54e1',
      name: 'tt',
      email: 'testtest.com',
      password: 'pass'
    });
    const response = await request(app)
      .delete(`/api/user/${invalidID._id}`)
      .expect(404);
  });
});
