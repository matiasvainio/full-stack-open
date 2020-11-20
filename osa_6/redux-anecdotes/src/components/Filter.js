import React from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = (props) => {
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    // dispatch(filterChange(event.target.value));
    props.filterChange(event.target.value);
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

const mapDispatchToProps = {
  filterChange,
};

const connectedFilter = connect(null, mapDispatchToProps)(Filter);

export default connectedFilter;
