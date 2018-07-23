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

  it('should retrieve all users on GET request to /user ', async () => {
    const response = await request(app)
      .get('/api/user')
      .expect(200);
  });

  it('should find an user on GET request to /user/id', async () => {
    const response = await request(app)
      .get(`/api/user/${user._id}`)
      .expect(200);
  });

  it("shouldn't find an user on GET request to /user/invalidId ", async () => {
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

  it('should create an user on POST request to /user', async () => {
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

  it("shouldn't create an user on POST request to /user (missing name)", async () => {
    const missingName = new User({
      email: 'test@test.com',
      password: 'password'
    });
    const response = await request(app)
      .post('/api/user')
      .send(missingName)
      .expect(422);
  });

  it("shouldn't create an user on POST request to /user (missing email)", async () => {
    const missingEmail = new User({ name: 'tester', password: 'password' });
    const response = await request(app)
      .post('/api/user')
      .send(missingEmail)
      .expect(422);
  });

  it("shouldn't create an user on POST request to /user (missing password)", async () => {
    const missingPassword = new User({
      name: 'tester',
      email: 'test@test.com'
    });
    const response = await request(app)
      .post('/api/user')
      .send(missingPassword)
      .expect(422);
  });

  it('should update an existing user on PUT request to /user/id', async () => {
    const updatedProps = { name: 'userupdated' };
    const response = await request(app)
      .put(`/api/user/${user._id}`)
      .send(updatedProps)
      .expect(200);
  });

  it("shouldn't update an existing user on PUT request to /user/invalidId", async () => {
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

  it("shouldn't update an existing user on PUT request to /user/id (invalid name)", async () => {
    const updatedProps = { name: 'tt' };

    const response = await request(app)
      .put(`/api/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it("shouldn't update an existing user on PUT request to /user/id (invalid email)", async () => {
    const updatedProps = { email: 'testtest.com' };

    const response = await request(app)
      .put(`/api/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it("shouldn't update an existing user on PUT request to /user/id (invalid password)", async () => {
    const updatedProps = { password: 'pass' };

    const response = await request(app)
      .put(`/api/user/${user._id}`)
      .send(updatedProps)
      .expect(422);
  });

  it('should delete an existing user on DELETE request to /user/id', async () => {
    const response = await request(app)
      .delete(`/api/user/${user._id}`)
      .expect(200);
  });

  it("shouldn't delete an existing user on DELETE request to /user/invalidId", async () => {
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
