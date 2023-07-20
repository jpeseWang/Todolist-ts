import React, { useContext, useState } from 'react';
import { TodoContext, FILTER_OPTIONS } from '../../context/TodoContext';
import styles from './Filters.module.scss';
export const FilterOptions: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { filter } = state;
  const [activeTab, setActiveTab] = useState('all');
  const handleFilterChange = (newFilter: string) => {
    dispatch({ type: 'SET_FILTER', payload: newFilter });
    setActiveTab(newFilter.toLowerCase());
  };

  const incompleteTasks = state.todos.filter(
    (task: { completed: any }) => task.completed === false
  );
  const incompleteTasksCount = incompleteTasks.length;
  const completedTasks = state.todos.length - incompleteTasksCount;

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <input
          type="radio"
          id="radio-1"
          name="filter"
          checked={filter === FILTER_OPTIONS.ALL}
          onChange={() => handleFilterChange(FILTER_OPTIONS.ALL)}
        />

        <label
          className={`${styles.tab} ${
            activeTab === 'all' ? styles.active : ''
          }`}
          htmlFor="radio-1"
        >
          All
          {filter === FILTER_OPTIONS.ALL && (
            <span className={styles.notification}>{state.todos.length}</span>
          )}
        </label>

        <input
          type="radio"
          id="radio-2"
          name="filter"
          checked={filter === FILTER_OPTIONS.ACTIVE}
          onChange={() => handleFilterChange(FILTER_OPTIONS.ACTIVE)}
        />
        <label
          className={`${styles.tab} ${
            activeTab === 'pending' ? styles.active : ''
          }`}
          htmlFor="radio-2"
        >
          Active
          {filter === FILTER_OPTIONS.ACTIVE && (
            <span className={styles.notification}>{incompleteTasksCount}</span>
          )}
        </label>

        <input
          type="radio"
          id="radio-3"
          name="filter"
          checked={filter === FILTER_OPTIONS.COMPLETED}
          onChange={() => handleFilterChange(FILTER_OPTIONS.COMPLETED)}
        />
        <label
          className={`${styles.tab} ${
            activeTab === 'completed' ? styles.active : ''
          }`}
          htmlFor="radio-3"
        >
          Completed
          {filter === FILTER_OPTIONS.COMPLETED && (
            <span className={styles.notification}>{completedTasks}</span>
          )}
        </label>
        <span className={styles.glider}></span>
      </div>
    </div>
  );
};
