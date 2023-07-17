import React, { useContext } from "react";
import { TodoContext, FILTER_OPTIONS } from "../context/TodoContext";

const FilterOptions: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { filter } = state;

  const handleFilterChange = (newFilter: string) => {
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="filter"
          checked={filter === FILTER_OPTIONS.ALL}
          onChange={() => handleFilterChange(FILTER_OPTIONS.ALL)}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          checked={filter === FILTER_OPTIONS.ACTIVE}
          onChange={() => handleFilterChange(FILTER_OPTIONS.ACTIVE)}
        />
        Active
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          checked={filter === FILTER_OPTIONS.COMPLETED}
          onChange={() => handleFilterChange(FILTER_OPTIONS.COMPLETED)}
        />
        Completed
      </label>
    </div>
  );
};

export default FilterOptions;
