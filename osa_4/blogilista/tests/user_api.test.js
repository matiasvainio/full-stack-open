const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);
const helper = require('./test_helper');

const User = require('../models/user');

beforeAll(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe('user add tests', () => {
  test('working user add', async () => {
    const newUser = {
      name: 'Clark Kent',
      username: 'Superman',
      password: 'salasana',
    };

    await api.post('/api/users').send(newUser).expect(200);
  });

  test('bad user', async () => {
    const badUser = {
      name: 'Clark Kent',
      username: 'Superman',
      password: 'salasana',
    };

    await api.post('/api/users').send(badUser).expect(400);
  });

  test('duplicate username', async () => {
    const newUser = {
      name: 'Clark Kent',
      username: 'Superman',
      password: 'salasana',
    };
    api.post('/api/users').send(newUser).expect(400);
  });

  test('username or pw missing', async () => {
    const newUser = {
      username: 'Superman',
      password: 'salasana',
    };
    api.post('/api/users').send(newUser).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
