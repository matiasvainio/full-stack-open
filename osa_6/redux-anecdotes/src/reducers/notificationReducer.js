const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'HIDE':
      const emptyState = '';
      return emptyState;
    case 'SET_SHOW':
      return action.notification;
    default:
      return state;
  }
};

export const createNotification = (notification) => {
  return {
    type: 'SET_SHOW',
    notification,
  };
};

export const removeNotification = () => {
  return {
    type: 'HIDE',
  };
};

export default notificationReducer;
