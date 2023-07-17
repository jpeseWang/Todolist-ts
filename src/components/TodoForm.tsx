import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { Todo } from "../interfaces/interfaces";

const TodoForm: React.FC = () => {
  const { dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
        deadline,
      };
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setText("");
      setDeadline("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <input
        type="datetime-local"
        value={deadline}
        onChange={handleDeadlineChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
