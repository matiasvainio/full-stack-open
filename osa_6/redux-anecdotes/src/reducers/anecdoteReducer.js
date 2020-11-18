import anecdotesService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    case 'CREATE':
      return [...state, action.data];
    case 'INIT_ANECDOTE':
      return action.data;
    default:
      return state;
  }
};

export const addVote = (anecdote) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'VOTE',
      data: anecdote,
    });
    const state = getState();
    const newAnecdote = state.anecdotes.find((a) => a.id === anecdote.id);
    await anecdotesService.update(anecdote.id, newAnecdote);
  };
};

export const createAnecdote = (content) => {
  const object = {
    content: content,
    id: getId(),
    votes: 0,
  };
  return async (dispatch) => {
    await anecdotesService.create(object);
    dispatch({
      type: 'CREATE',
      data: object,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes,
    });
  };
};

export default reducer;
