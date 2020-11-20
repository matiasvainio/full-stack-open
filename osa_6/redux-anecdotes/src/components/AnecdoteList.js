import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  // const anecdotes = useSelector((state) =>
  //   state.anecdotes.sort((a, b) => b.votes - a.votes)
  // );

  const anecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes);

  // const filter = useSelector((state) => state.filter);

  // const getAnecdotes = (filter) => {
  //   if (filter) {
  //     return [
  //       ...anecdotes.filter((a) =>
  //         a.content.toUpperCase().includes(filter.toUpperCase())
  //       ),
  //     ];
  //   }
  //   return anecdotes;
  // };

  // const dispatch = useDispatch();

  const vote = (anecdote) => {
    // dispatch(addVote(anecdote));
    props.addVote(anecdote);

    const notification = anecdotes.filter((a) => a.id === anecdote.id)[0]
      .content;

    // dispatch(setNotification(`you voted '${notification}'`, 2));
    props.setNotification(`you voted '${notification}'`, 5);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
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

const mapStateToProps = (state) => {
  if (state.filter) {
    return {
      anecdotes: state.anecdotes.filter((a) =>
        a.content.toUpperCase().includes(state.filter.toUpperCase())
      ),
    };
  }
  return { anecdotes: state.anecdotes, filter: state.filter };
};

const mapDispatchToProps = {
  addVote,
  setNotification,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdotes;
