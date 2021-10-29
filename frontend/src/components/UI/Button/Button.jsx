import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children, onClick, disabled, className, type,
}) => {
  const onClickAction = (event) => {
    if (disabled) {
      event.preventDefault();
      return false;
    }
    return onClick(event);
  };

  const classes = ['btn', styles[className]];

  return (
    <>
      {type === 'submit' ? (
        <button
          className={classes.join(' ')}
          type={type}
          disabled={disabled}
        >
          {children}

        </button>
      )
        : (
          <button
            className={classes.join(' ')}
            onClick={(event) => {
              onClickAction(event);
            }}
            type={type}
          >
            {children}
          </button>
        )}

    </>
  );
};

export default Button;
