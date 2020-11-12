const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });

  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const savedBlog = await blog.save();
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  // Blog.findByIdAndDelete(request.params.id, (err) => {
  //   if (err) {
  //     response.status(404).json();
  //   } else {
  //     response.status(204).json();
  //   }
  // });
  const { body } = request;
  const blog = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  }

  return response.status(401).json({ error: 'invalid token' });
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const newBlog = {
    likes: body.likes,
  };

  try {
    const returned = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
      new: true,
    });
    response.json(returned.toJSON());
  } catch (exception) {
    response.sendStatus(404);
  }
});

module.exports = blogsRouter;
