import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    deadline: string;
  };
  openUpdateModal: (todoId: number, todoText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, openUpdateModal }) => {
  const { dispatch } = useContext(TodoContext);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const handleToggle = () => {
    dispatch({ type: "TOGGLE_TODO", payload: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  };
  const handleEdit = () => {
    openUpdateModal(todo.id, todo.text); // Invoke the openUpdateModal function
  };

  const handleSave = () => {
    if (text.trim() !== "") {
      dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text } });
      setEditing(false);
    }
  };
  const handleCancel = () => {
    setText(todo.text);
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const deadlineTime = new Date(todo.deadline).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = deadlineTime - currentTime;
    const hoursLeft = timeDiff / (1000 * 60 * 60);

    if (hoursLeft <= 1 && !todo.completed) {
      alert(`Task  ${todo.text} has only 1 hour left!`);
    }
  }, [todo.deadline, todo.id, todo.completed]);

  return (
    <div>
      {!editing ? (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
          >
            {todo.text}
          </span>
          <p>{todo.deadline}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <>
          <input type="text" value={text} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
