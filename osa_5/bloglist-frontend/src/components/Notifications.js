import React from 'react';

const BlogNotification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <div>
      <h1>{notification}</h1>
    </div>
  );
};

const LoginNotification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <div className="error">
      <h1>{notification}</h1>
    </div>
  );
};

// BlogNotification.propTypes = {
//   notification: PropTypes.string.isRequired,
// };

// LoginNotification.propTypes = {
//   notification: PropTypes.string.isRequired,
// };

export { BlogNotification, LoginNotification };
