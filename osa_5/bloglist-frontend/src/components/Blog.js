import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs, blogs }) => {
  const [visible, setVisible] = useState(false);
  const [like, setLike] = useState(0);
  const [visibleButton, setVisibleButton] = useState(false);

  const handleRemoveButton = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));
    if (user.name !== blog.user.name) {
      setVisibleButton(!visibleButton);
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
    setLike(blog.likes);
    handleRemoveButton();
  };

  const showWhenVisible = { display: visible ? 'none' : '' };
  const hideWhenVisible = { display: visible ? '' : 'none' };
  const hideButton = { display: visibleButton ? 'none' : '' };

  const updateBlogs = (newBlog) => {
    const newBlogs = blogs.map((o) =>
      o.id === newBlog.id ? { ...o, likes: newBlog.likes } : o
    );
    setBlogs(newBlogs);
  };

  const handleLike = () => {
    setLike((newLike) => newLike + 1);
    const newBlog = { ...blog, likes: like + 1 };
    blogService.update(blog.id, newBlog);
    updateBlogs(newBlog);
  };

  const removeBlog = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogService.remove(id);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes));
    }
  };

  return (
    <div
      className="blog"
      style={{ border: '2px solid black', padding: '5px', margin: '5px' }}
    >
      {blog.title}
      {blog.author}
      <button type="button" style={hideWhenVisible} onClick={toggleVisibility}>
        hide
      </button>
      <button type="button" style={showWhenVisible} onClick={toggleVisibility}>
        show
      </button>
      <div style={hideWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {like}
          <button type="button" onClick={() => handleLike(blog)}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button
          type="button"
          onClick={() => removeBlog(blog.id)}
          style={hideButton}
        >
          remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default Blog;
