import React from 'react';
import Blog from '../components/Blog';

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

const BlogForm = ({ user, handleLogout, blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {`${user.name} logged in`}
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export { LoginForm, BlogForm };
