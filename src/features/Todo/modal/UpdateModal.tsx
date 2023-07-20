/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import styles from './modal.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../../components/Button/Button';
import btn from '../../../components/Button/Button.module.css';
import { Input } from '../../../components/Input/Input';
import ipt from '../../../components/Input/Input.module.css';
import classnames from 'classnames';
import { TodoContext } from '../context/TodoContext';
import { updateTodo } from '../../../services/TodoService';
interface UpdateModalProps {
  isOpen: boolean
  onClose: () => void
  todoId: number
  initialText: string
  initialDeadline: string
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  todoId,
  initialText,
  initialDeadline
}) => {
  const { dispatch } = useContext(TodoContext);
  const [text, setText] = useState(initialText);
  const [deadline, setDeadline] = useState(initialDeadline);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateTodo(todoId, text, deadline);
    if (res !== null) {
      if (text.trim().length > 250) {
        toast.error('Task must not be longer than 250 characters!');
      } else if (text.trim() !== '') {
        dispatch({
          type: 'EDIT_TODO',
          payload: { id: todoId, text, deadline }
        });
        toast.success(`Update task "${initialText}" successfully!`);
        onClose();
      } else {
        toast.error('Task must not be empty!');
      }
    }
  };

  let formattedDateString = 'No deadline';
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
      <div className={styles['confirm-box']}>
        <h1 className={styles.title}>Update task</h1>
        <div className={styles.text}>
          <b>Task:</b> <i>“{initialText}”</i> <br></br>
          <b>Deadline:</b> {formattedDateString}
        </div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <textarea
            className={ipt.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your new task..."
          />
          <Input
            className={ipt.textarea}
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          /><span> <i>Click to update your new deadline...</i></span>
          <div>
            <Button
              onClick={onClose}
              className={classnames(btn['btn-group'], btn['btn-filter'])}
            >
              Close
            </Button>
            <Button
              type="submit"
              className={classnames(btn['btn-group'], btn['btn-primary'])}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
