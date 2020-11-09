import React from 'react';

const BlogForm = ({
  handleNewBlog,
  user,
  handleLogout,
  blogs,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <div>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
