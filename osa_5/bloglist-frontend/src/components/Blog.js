import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false);
  const [like, setLike] = useState(0);
  const [visibleButton, setVisibleButton] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
    setLike(blog.likes);
    handleRemoveButton();
  };

  const showWhenVisible = { display: visible ? 'none' : '' };
  const hideWhenVisible = { display: visible ? '' : 'none' };
  const hideButton = { display: visibleButton ? 'none' : '' };

  const handleLike = (blog) => {
    setLike((like) => like + 1);
    const newBlog = { ...blog, likes: like + 1 };
    blogService.update(blog.id, newBlog);
  };

  const removeBlog = async (id) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogService.remove(id);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    }
  };

  const handleRemoveButton = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));
    if (user.name !== blog.user.name) {
      setVisibleButton(!visibleButton);
    }
  };

  return (
    <div style={{ border: '2px solid black', padding: '5px', margin: '5px' }}>
      {handleRemoveButton}
      {blog.title} {blog.author}{' '}
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        hide
      </button>
      <button style={showWhenVisible} onClick={toggleVisibility}>
        show
      </button>
      <div style={hideWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {like}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => removeBlog(blog.id)} style={hideButton}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
