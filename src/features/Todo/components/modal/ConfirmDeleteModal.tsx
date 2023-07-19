import React from "react";
import Modal from "react-modal";
import styles from "./modal.module.css";
import "react-toastify/dist/ReactToastify.css";

interface ComfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteModal: React.FC<ComfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-overlay custom-modal"
    >
      <div className={styles["confirm-box"]}>
        <form onSubmit={handleConfirm}>
          <div className="user-box">
            <i className="fa-regular fa-circle-xmark"></i>
            <h1 className={styles.title2}>Are you sure</h1>
            <div className={styles.text}>
              To delete this task? <br></br>
              <b>This action can&apos;t be redo!</b>
            </div>
            <br></br>
          </div>
          <button onClick={onClose} className="btn-cancel btn-group">
            Cancel
          </button>
          <button type="submit" className="btn-delete btn-group">
            Confirm
          </button>
        </form>
      </div>
    </Modal>
  );
};
