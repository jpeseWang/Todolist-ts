import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import styles from "./modal.module.css";
import "react-toastify/dist/ReactToastify.css";
import "../../../../styles/Textarea.css";
import "../../../../styles/Button.css";
import { TodoContext } from "../../context/TodoContext";
interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: number;
  initialText: string;
  initialDeadline: string;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  todoId,
  initialText,
  initialDeadline,
}) => {
  const { dispatch } = useContext(TodoContext);
  const [text, setText] = useState(initialText);
  const [deadline, setDeadline] = useState(initialDeadline);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "" && deadline.trim() !== "") {
      dispatch({ type: "EDIT_TODO", payload: { id: todoId, text, deadline } });
      toast.success(`Update task "${initialText}" successfully!`);
      setText("");
      onClose();
    } else {
      toast.error("Task must not be empty!");
    }
  };

  let formattedDateString = "No deadline";
  if (initialDeadline.length > 0) {
    const date = new Date(initialDeadline);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    formattedDateString = `${hours}:${minutes} | ${day}/${month}/${year}`;
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Todo"
      ariaHideApp={false}
      className="custom-overlay custom-modal"
    >
      <div className={styles["confirm-box"]}>
        <h1 className={styles.title}>Update task</h1>
        <i className="fa-sharp fa-regular fa-pen-circle"></i>
        <div className={styles.description}>
          <b>Task:</b> <i>“{initialText}”</i> <br></br>
          <b>Deadline:</b> {formattedDateString}
        </div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input
            className="textarea2"
            type="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your new task"
          />
          <input
            className="textarea2"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <div>
            <button onClick={onClose} className="btn-group btn-filter">
              Close
            </button>
            <button type="submit" className="btn-group btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
