import React from 'react';
import styles from './Form.module.css';

const Input = ({
  name, type, onChange,
  value, touched, errors,
  placeholder, className,
  labelClassName, title,
  checked,
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={styles[labelClassName]}>
    <input
      checked={checked}
      id={name}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={`${type === 'radio' ? 'visually-hidden ' : ''}${styles[className]}${touched && errors ? ` ${styles.error}` : ''}`}
    />
    {touched && errors ? (
      <span className={styles.errorSpan}>{errors}</span>
    ) : null}
    {type === 'radio' && (
    <>
      <span className={styles.inputIco} />
      <span className={styles.title}>{title}</span>
    </>
    )}
  </label>
);

export default Input;
