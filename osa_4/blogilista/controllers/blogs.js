const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  console.log(await User.find({}));

  const user = await User.findById(body.userId);

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
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();
    // eslint-disable-next-line no-underscore-dangle
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog.toJSON());
  }
});

blogsRouter.delete('/:id', (request, response) => {
  console.log(request.params.id);
  Blog.findByIdAndDelete(request.params.id, (err) => {
    if (err) {
      response.status(404).json();
    } else {
      response.status(204).json();
    }
  });
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const newBlog = {
    likes: body.likes,
  };

  try {
    const returned = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
    response.json(returned.toJSON());
  } catch (exception) {
    response.sendStatus(404);
  }
});

module.exports = blogsRouter;
