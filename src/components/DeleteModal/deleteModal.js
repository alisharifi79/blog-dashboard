import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ show, onHide, onConfirm, postTitle }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Delete Article</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        Are you sure you want to delete <strong>{postTitle}</strong>?
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button onClick={onHide} className={styles.cancelButton}>
          No
        </Button>
        <Button onClick={onConfirm} className={styles.deleteButton}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
