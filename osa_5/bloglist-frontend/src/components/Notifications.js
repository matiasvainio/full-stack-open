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
    <div>
      <h1>{notification}</h1>
    </div>
  );
};

export { BlogNotification, LoginNotification };
