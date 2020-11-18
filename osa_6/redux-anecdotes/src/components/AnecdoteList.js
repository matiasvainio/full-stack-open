import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );

  const filter = useSelector((state) => state.filter);

  const getAnecdotes = (filter) => {
    if (filter) {
      return [
        ...anecdotes.filter((a) =>
          a.content.toUpperCase().includes(filter.toUpperCase())
        ),
      ];
    }
    return anecdotes;
  };

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));

    const notification = anecdotes.filter((a) => a.id === anecdote.id)[0]
      .content;

    dispatch(setNotification(`you voted '${notification}'`, 2));
  };

  return (
    <div>
      {getAnecdotes(filter).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
