/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ message, setMessage, successAction }) => {
  const [visible, setVisible] = useState(true);
  const classList = [styles.modal];

  if (visible) {
    classList.push(styles.visible);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setMessage(null);
    }, 3000);
    return () => {
      clearTimeout(timer);
      if (successAction) {
        successAction();
      }
    };
  });

  return (
    <div
      className={classList.join(' ')}
      onClick={() => {
        setVisible(false);
      }}
    >
      <div className={styles.container}>
        <h1 className={styles.error}>{message}</h1>
      </div>
    </div>
  );
};

export default Modal;
