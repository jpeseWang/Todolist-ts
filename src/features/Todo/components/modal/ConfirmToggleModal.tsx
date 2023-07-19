/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from "react";
import Modal from "react-modal";
import styles from "./modal.module.css";
import "react-toastify/dist/ReactToastify.css";

interface ComfirmToggleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmToggleModal: React.FC<ComfirmToggleModalProps> = ({
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
            <i className="fa-regular fa-circle-check"></i>
            <h1 className={styles.title2}>Are you sure</h1>
            <div className={styles.text}>
              To finish this task? <br></br>
              <b>This action can&apos;t be redo!</b>
            </div>
            <br></br>
          </div>
          <button onClick={onClose} className="btn-cancel btn-group">
            Cancel
          </button>
          <button type="submit" className="btn-finish btn-group">
            Confirm
          </button>
        </form>
      </div>
    </Modal>
  );
};
