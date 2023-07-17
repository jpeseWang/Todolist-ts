import React, { useContext } from "react";
import { TodoContext, FILTER_OPTIONS } from "../context/TodoContext";
import TodoItem from "./TodoItem";

interface TodoListProps {
  openUpdateModal: (todoId: number, todoText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ openUpdateModal }) => {
  const { state } = useContext(TodoContext);
  const { todos, filter } = state;

  let filteredTodos = todos;

  if (filter === FILTER_OPTIONS.ACTIVE) {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter === FILTER_OPTIONS.COMPLETED) {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} openUpdateModal={openUpdateModal} />
      ))}
    </div>
  );
};

export default TodoList;
