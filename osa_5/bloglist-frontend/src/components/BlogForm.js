import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
      likes: 0,
      user,
    });
  };

  return (
    <div>
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              id="url"
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="save-button" type="submit">
            save
          </button>
        </form>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default BlogForm;
