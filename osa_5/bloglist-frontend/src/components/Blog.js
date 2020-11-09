import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
  return (
    <div style={{ border: '2px solid black', padding: '5px', margin: '5px' }}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view" buttonLabel2="hide">
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </Togglable>
    </div>
  );
};

export default Blog;
