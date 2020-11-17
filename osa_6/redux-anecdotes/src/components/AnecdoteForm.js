import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  createNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.input.value));
    dispatch(createNotification(event.target.input.value));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
