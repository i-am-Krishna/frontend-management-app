import React from 'react';
import styles from './css/SuccessModal.module.css'; 

const SuccessModal = ({ email, closeModal }) => {
   
  return (
    <div className={styles.modalbackdrop}>
      <div className={styles.modalcontent}>
        <p>{email} added to the board</p>
        <button className={styles.modalbutton} onClick={closeModal}>Okay, got it!</button>
      </div>
    </div>
  );
};

export default SuccessModal;
