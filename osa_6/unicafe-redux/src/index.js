import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const send = (type) => {
    store.dispatch({
      type: type,
    });
  };

  const reset = () => {
    store.dispatch({
      type: 'ZERO',
    });
  };

  return (
    <div>
      <button onClick={() => send('GOOD')}>good</button>
      <button onClick={() => send('OK')}>neutral</button>
      <button onClick={() => send('BAD')}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad} </div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
