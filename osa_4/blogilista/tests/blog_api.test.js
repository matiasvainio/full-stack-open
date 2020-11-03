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

  expect(mapped).toBeDefined();
});

test('blog added to /api/blogs', async () => {
  const newBlog = {
    title: 'test',
    author: 'tester',
    url: 'www.testing.com',
    likes: 5,
  };

  await api.post('/api/blogs').send(newBlog).expect(201);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const urls = blogsAtEnd.map((blog) => blog.url);
  expect(urls).toContain('www.testing.com');
});

test('expect likes to be atleast 0', async () => {
  const newBlog = {
    title: 'test',
    author: 'tester',
    url: 'www.testing.com',
  };

  await api.post('/api/blogs').send(newBlog).expect(201);
  const blogsAtEnd = await helper.blogsInDb();
  const likesAtEnd = blogsAtEnd.map((blog) => blog.likes);

  expect(likesAtEnd).not.toContain(undefined);
});

test('expect title and url to be present', async () => {
  const newBlog = {
    // title: 'test',
    author: 'tester',
    // url: 'www.testing.com',
    likes: 5,
  };

  await api.post('/api/blogs').send(newBlog).expect(201);
});

describe('remove/update operations', () => {
  test('delete single blog from the list', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToDelete = initialBlogs[0];
    // blogToDelete.id = '5a422bc61b54a676234d17fq';

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });

  test('update blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    // blogToUpdate.id = '5a422a851b54a676234d17f';

    const newBlog = {
      likes: 10,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(newBlog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
