import React, { useState, useEffect } from 'react';
import { LoginForm, BlogForm } from './components/Forms';
import {
  BlogNotification,
  LoginNotification,
} from './components/Notifications';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [loginNot, setLoginNot] = useState(null);
  const [newBlogNot, setNewBlogNot] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
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

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = await blogService.create({
      title: title,
      author: author,
      url: url,
    });
    setBlogs(blogs.concat(newBlog));
    setAuthor('');
    setTitle('');
    setUrl('');
    setNewBlogNot(`New blog ${title} by ${author} added`);
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
          <BlogForm
            handleNewBlog={handleNewBlog}
            user={user}
            handleLogout={handleLogout}
            blogs={blogs}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </div>
      )}
    </div>
  );
};

export default App;
