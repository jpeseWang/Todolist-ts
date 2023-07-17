import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";
import UpdateModal from "./components/UpdateModal";
import FilterOptions from "./components/FilterOptions";

const App: React.FC = () => {
  const [updateTodo, setUpdateTodo] = useState({ id: 0, text: "" });

  const openUpdateModal = (todoId: number, todoText: string) => {
    setUpdateTodo({
      id: todoId,
      text: todoText,
    });
  };

  const closeUpdateModal = () => {
    setUpdateTodo({ id: 0, text: "" });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoProvider>
        <TodoForm />
        <FilterOptions />
        <TodoList openUpdateModal={openUpdateModal} />

        {updateTodo.id !== 0 && (
          <UpdateModal
            isOpen={true}
            onClose={closeUpdateModal}
            todoId={updateTodo.id}
            initialText={updateTodo.text}
          />
        )}
      </TodoProvider>
    </div>
  );
};

export default App;
