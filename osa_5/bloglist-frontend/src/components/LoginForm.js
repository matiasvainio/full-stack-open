import React from 'react';
import PropTypes from 'prop-types';

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

LoginForm.propTypes = {
  handleLogin: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.string.isRequired,
  setPassword: PropTypes.string.isRequired,
};

export default LoginForm;
