import React, { useState, useContext } from "react";
import { Todo } from "../../../../interfaces/interfaces";
import { TodoContext } from "../../context/TodoContext";
import { toast } from "react-toastify";
export const TodoForm: React.FC = () => {
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
    if (text.trim().length > 0) {
      if (new Date(deadline).getTime() < Date.now()) {
        toast.error("Deadline must be in the future!");
      } else {
        const newTodo: Todo = {
          id: Date.now(),
          text,
          completed: false,
          deadline,
        };
        dispatch({ type: "ADD_TODO", payload: newTodo });
        toast.success("Create new task successfully!");
        setText("");
        setDeadline("");
      }
    } else {
      toast.error("Task must not be empty!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => {
        setText("");
        setDeadline("");
      }}
    >
      <input
        className="textarea"
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Create your new task..."
      />
      <input
        className="textarea2"
        type="datetime-local"
        value={deadline}
        onChange={handleDeadlineChange}
      />

      <button type="submit" className="btn-group btn-primary">
        Add Task
      </button>
    </form>
  );
};
