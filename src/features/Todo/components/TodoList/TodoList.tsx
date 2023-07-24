import React, { useContext, useEffect } from 'react';
import { TodoContext, FILTER_OPTIONS } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';
import { fetchTodos } from '../../../../services/TodoService';
interface TodoListProps {
  openUpdateModal: (
    todoId: number,
    todoText: string,
    todoDeadline: string
  ) => void
}

export const TodoList: React.FC<TodoListProps> = ({ openUpdateModal }) => {
  const { state, dispatch } = useContext(TodoContext);
  const { todos, filter } = state;
  let filteredTodos = todos;

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      dispatch({ type: 'SET_TODOS', payload: fetchedTodos });
    };
    loadTodos();
  }, [dispatch, state.todos.length]);

  if (filter === FILTER_OPTIONS.ACTIVE) {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter === FILTER_OPTIONS.COMPLETED) {
    filteredTodos = todos.filter((todo) => todo.completed);
  }
  if (todos.length === 0) {
    return (
      <h1 className={styles.noti}>
        Congratulations, no task need to be finished!{' '}
        <i className="fa-solid fa-face-smile"></i>
      </h1>
    );
  }

  return (
    <div className={styles.container}>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          openUpdateModal={(todoId, todoText, todoDeadline) =>
            openUpdateModal(todoId, todoText, todoDeadline)
          }
        />
      ))}
    </div>
  );
};
