import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import Modal from "react-modal";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: number;
  initialText: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  todoId,
  initialText,
}) => {
  const { dispatch } = useContext(TodoContext);
  const [text, setText] = useState(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch({ type: "EDIT_TODO", payload: { id: todoId, text } });
      setText("");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Todo"
      ariaHideApp={false}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default UpdateModal;
