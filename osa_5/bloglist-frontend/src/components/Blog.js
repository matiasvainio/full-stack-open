import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, removeBlog, updateBlogs, blogService }) => {
  const [visible, setVisible] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const [like, setLike] = useState(0);

  const handleRemoveButton = () => {
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

  const handleLike = (blogObject) => {
    setLike((newLike) => newLike + 1);
    const newBlog = { ...blogObject, likes: like + 1 };
    blogService.update(blogObject.id, newBlog);
    updateBlogs(newBlog);
  };

  return (
    <div
      className="blog"
      style={{ border: '2px solid black', padding: '5px', margin: '5px' }}
    >
      {blog.title} {blog.author}
      <button type="button" style={hideWhenVisible} onClick={toggleVisibility}>
        hide
      </button>
      <button
        className="show-button"
        type="button"
        style={showWhenVisible}
        onClick={toggleVisibility}
      >
        show
      </button>
      <div style={hideWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          <span className="like">{like}</span>
          <button
            className="like-button"
            type="button"
            onClick={() => handleLike(blog)}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button
          id="remove-button"
          type="button"
          onClick={() => removeBlog(blog)}
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
};

export default Blog;
