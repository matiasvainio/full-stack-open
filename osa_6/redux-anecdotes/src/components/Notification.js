import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const foo = useSelector((state) => state.notification);

  if (!foo) {
    return <div style={{ display: 'none' }}>{notification}</div>;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  console.log('notification', notification);
  return <div style={style}>{notification}</div>;
};

export default Notification;
