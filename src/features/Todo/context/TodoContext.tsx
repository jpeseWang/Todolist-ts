/* eslint-disable indent */
import React, { createContext, useReducer } from 'react';
import { TodoState, Action } from '../../../interfaces/interfaces';
export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};
interface TodoContextProps {
  state: TodoState
  dispatch: React.Dispatch<Action>
}

const initialState: TodoState = {
  todos: [],
  filter: 'all'
};

const TodoContext = createContext<TodoContextProps>({
  state: initialState,
  dispatch: () => {}
});

const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, deadline: action.payload.deadline }
            : todo
        )
      };
    case 'SET_TODOS': {
      return { ...state, todos: action.payload };
    }
    default:
      return state;
  }
};

const TodoProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
