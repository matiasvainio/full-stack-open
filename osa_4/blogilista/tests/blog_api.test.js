const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect(200);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('identfier field is called id', async () => {
  const response = await api.get('/api/blogs').expect(200);
  const mapped = response.body.map((id) => id.id);

  console.log(mapped);
  expect(mapped).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
