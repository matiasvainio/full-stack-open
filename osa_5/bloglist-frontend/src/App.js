import React, { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import {
  BlogNotification,
  LoginNotification,
} from './components/Notifications';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginNot, setLoginNot] = useState(null);
  const [newBlogNot, setNewBlogNot] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((retBlogs) => setBlogs(retBlogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON);
      setUser(newUser);
      blogService.setToken(newUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser));

      setUser(newUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setLoginNot('Wrong username or password.');
      setTimeout(() => {
        setLoginNot(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    setBlogs(blogs.concat(blogObject));
    await blogService.create(blogObject);

    setNewBlogNot(`New blog ${blogObject.title} by ${blogObject.author} added`);
    setTimeout(() => {
      setNewBlogNot(null);
    }, 5000);
  };

  return (
    <div>
      {user === null ? (
        <div>
          <LoginNotification notification={loginNot} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <BlogNotification notification={newBlogNot} />
          <h2>blogs</h2>
          <div>
            {`${user.name} logged in`}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </div>
          <Togglable
            buttonLabel="new blog"
            buttonLabel2="cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} user={user} />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                setBlogs={setBlogs}
                blogs={blogs}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
