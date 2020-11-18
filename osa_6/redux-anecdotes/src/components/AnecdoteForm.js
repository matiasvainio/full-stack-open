import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.input.value;

    dispatch(createAnecdote(content));
    dispatch(setNotification(`new anecdote '${content}'`, 5));

    event.target.input.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input onChange={handleCreate} name="input" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
