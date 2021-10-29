/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ children, ...props }) => {
  const classList = [styles.modal];
  const {
    setShowModal, isError, isSuccess, successAction,
  } = props;
  if (isError) {
    classList.push(styles.error);
  }
  if (isSuccess) {
    classList.push(styles.success);
  }

  useEffect(() => {
    let timer;
    if (isError || isSuccess) {
      timer = setTimeout(() => {
        setShowModal(null);
        if (successAction) {
          successAction();
        }
      }, 3000);
    }

    return () => clearTimeout(timer);
  });

  return (
    <div className={classList.join(' ')}>
      <button
        type="button"
        onClick={() => {
          setShowModal(false);
        }}
        className={styles.close}
      />
      {children}
    </div>
  );
};

export default Modal;
