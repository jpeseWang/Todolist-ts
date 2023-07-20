/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import Modal from 'react-modal';
import styles from './modal.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../../components/Button/Button';
import btn from '../../../components/Button/Button.module.css';
import classnames from 'classnames';
import { deleteTodo } from '../../../services/TodoService';
interface ComfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  id: number
}

export const ConfirmDeleteModal: React.FC<ComfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  id
}) => {
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await deleteTodo(id);
    if (res !== null) {
      onConfirm();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-overlay custom-modal"
    >
      <div className={styles['confirm-box']}>
        <form onSubmit={handleConfirm}>
          <div className="user-box">
            <i className="fa-regular fa-circle-xmark confirm-delete"></i>
            <h1 className={styles.title2}>Are you sure</h1>
            <div className={styles.text}>
              To delete this task? <br></br>
              <b>This action can&apos;t be redo!</b>
            </div>
            <br></br>
          </div>
          <Button
            onClick={onClose}
            className={classnames(btn['btn-cancel'], btn['btn-group'])}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={classnames(btn['btn-delete'], btn['btn-group'])}
          >
            Confirm
          </Button>
        </form>
      </div>
    </Modal>
  );
};
