import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import styles from './TodoItem.module.css';
import { toast } from 'react-toastify';
import { ConfirmDeleteModal } from '../../modal/ConfirmDeleteModal';
import { ConfirmToggleModal } from '../../modal/ComfirmToggleModal';
import { Button } from '../../../../components/Button/Button';
import btn from '../../../../components/Button/Button.module.css';
import classnames from 'classnames';
interface TodoItemProps {
  todo: {
    id: number
    text: string
    completed: boolean
    deadline: string
  }
  openUpdateModal: (
    todoId: number,
    todoText: string,
    todoDeadline: string
  ) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  openUpdateModal
}) => {
  const { dispatch } = useContext(TodoContext);
  const [remainingTime, setRemainingTime] = useState('');
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showConfirmToggleModal, setShowConfirmToggleModal] = useState(false);

  const handleToggle = () => {
    if (!todo.completed) {
      setShowConfirmToggleModal(true);
    }
  };
  const handleConfirmToggle = () => {
    if (!todo.completed) {
      dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
    }
    setShowConfirmToggleModal(false);
  };
  const handleDelete = () => {
    setShowConfirmDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
    toast.info('Delete task successfully!');
    setShowConfirmDeleteModal(false);
  };
  const handleCancel = () => {
    setShowConfirmDeleteModal(false);
    setShowConfirmToggleModal(false);
  };
  const handleEdit = () => {
    if (!todo.completed) {
      openUpdateModal(todo.id, todo.text, todo.deadline);
    }
  };

  useEffect(() => {
    const deadlineTime = new Date(todo.deadline).getTime();
    const updateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const timeDiff = deadlineTime - currentTime;
      if (timeDiff <= 0) {
        setRemainingTime('Overdue');
      } else if (timeDiff !== 0 && todo.completed) {
        setRemainingTime('Finished');
      } else if (Number.isNaN(timeDiff)) {
        setRemainingTime('No deadline');
      } else {
        const minutesLeft = Math.floor((timeDiff / (1000 * 60)) % 60);
        const hoursLeft = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        setRemainingTime(`${daysLeft}d ${hoursLeft}h ${minutesLeft}m left`);
        if (hoursLeft < 1 && !todo.completed) {
          toast.warn(`Task "${todo.text}" only has 1 hour left`);
        }
      }
    };
    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 90000);

    return () => {
      clearInterval(interval);
    };
  }, [todo.deadline]);
  function getRemainingTimeColor (remainingTime: string) {
    if (remainingTime === 'No deadline') {
      return styles.grey;
    } else if (remainingTime === 'Overdue') {
      return styles.red;
    } else if (remainingTime === 'Finished') {
      return styles.green;
    } else {
      return styles.yellow;
    }
  }

  return (
    <div>
      <li
        className={styles['item-card']}
        style={{ opacity: todo.completed ? '0.4' : '1' }}
      >
        <>
          <div className={styles['item-container']}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className={styles['check-box']}
            />
            <span className={styles['item-content']}>
              {todo.text}
              <br />
              <span className={getRemainingTimeColor(remainingTime)}>
                {remainingTime}
              </span>
            </span>
            <Button onClick={handleEdit} className={classnames(btn['btn-edit'], btn['btn-group'])}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button onClick={handleDelete} className={classnames(btn['btn-delete-2'], btn['btn-group'])}>
              <i className="fa-solid fa-trash"></i>
            </Button>
          </div>
        </>
      </li>
      {showConfirmDeleteModal && (
        <ConfirmDeleteModal
          isOpen={showConfirmDeleteModal}
          onClose={handleCancel}
          onConfirm={handleConfirmDelete}
          id={todo.id}
        />
      )}
      {showConfirmToggleModal && (
        <ConfirmToggleModal
          isOpen={showConfirmToggleModal}
          onClose={handleCancel}
          onConfirm={handleConfirmToggle}
        />
      )}
    </div>
  );
};
