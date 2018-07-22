const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');

User = require('../../models/user');

describe('API test - Authentication', () => {
  let user, user1;

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

  it("GET request to /api/auth/google forwards user's request to Google", async () => {
    //redirect
    const response = await request(app)
      .get('/api/auth/google')
      .expect(302);
  });

  it('GET request to /api/auth/google/callback generates token and redirect', async () => {});

  it('POST request to /api/auth/signup register a new user', async () => {
    const newUser = new User({
      name: 'user',
      email: 'imnew2@test.com',
      password: 'password'
    });
    const response = await request(app)
      .post('/api/auth/signup')
      .send(newUser)
      .expect(200);
  });

  it('POST request to  /api/auth/signin logs an user in', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'idoexist@test.com',
        password: 'password'
      })
      .expect(res => expect(res.body).to.have.property('token'))
      .expect(200);
  });
});
