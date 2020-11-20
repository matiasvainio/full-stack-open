const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'HIDE':
      return '';
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

let timer;

export const setNotification = (text, time) => {
  clearTimeout(timer);
  return async (dispatch) => {
    dispatch({
      type: 'SET_SHOW',
      notification: text,
    });
    timer = setTimeout(() => {
      dispatch({
        type: 'HIDE',
      });
    }, time * 1000);
  };
};

export default notificationReducer;
