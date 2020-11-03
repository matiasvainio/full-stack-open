const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    blog.save().then((result) => {
      response.status(201).json(result);
    });
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
