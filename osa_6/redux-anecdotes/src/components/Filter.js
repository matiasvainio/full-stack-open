import React from 'react';
import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(filterChange(event.target.value));
  };

  return (
    <div>
      <form>
        filter
        <input onChange={handleChange}></input>
      </form>
    </div>
  );
};

export default Filter;
