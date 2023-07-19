import React, { useState } from "react";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import { FilterOptions } from "./components/Filters/FilterOptions";
import { TodoProvider } from "./context/TodoContext";
import { UpdateModal } from "./components/modal/UpdateModal";
import styles from "./Todo.module.css";
export const Todo: React.FC = () => {
  const [updateTodo, setUpdateTodo] = useState({
    id: 0,
    text: "",
    deadline: "",
  });

  const openUpdateModal = (
    todoId: number,
    todoText: string,
    todoDeadline: string
  ) => {
    setUpdateTodo({
      id: todoId,
      text: todoText,
      deadline: todoDeadline,
    });
  };

  const closeUpdateModal = () => {
    setUpdateTodo({ id: 0, text: "", deadline: "" });
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <h1 className={styles.title}>Tasks Management</h1>
        <p>
          &quot;Every day should be a good day. People fool themselves that
          they&apos;ll be here forever.&quot;
        </p>
        <TodoProvider>
          <TodoForm />
          <br></br>
          <FilterOptions />
          <br></br>
          <div className={styles.list}>
            <TodoList openUpdateModal={openUpdateModal} />
          </div>
          {updateTodo.id !== 0 && (
            <UpdateModal
              isOpen={true}
              onClose={closeUpdateModal}
              todoId={updateTodo.id}
              initialText={updateTodo.text}
              initialDeadline={updateTodo.deadline}
            />
          )}
        </TodoProvider>
      </div>
    </div>
  );
};
