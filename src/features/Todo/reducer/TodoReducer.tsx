/* eslint-disable indent */
import { TodoState, Action } from "../../../interfaces/interfaces";

export const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                text: action.payload.text,
                deadline: action.payload.deadline,
              }
            : todo
        ),
      };
    case "SET_TODOS": {
      return { ...state, todos: action.payload };
    }
    default:
      return state;
  }
};
