import React from 'react';
// import './Button.module.css';
import styles from './Button.module.css';
// import classNames from 'classnames';

const Button = ({
  children, onClick, disabled, className, type, isMobile,
}) => {
  const onClickAction = (event) => {
    if (disabled) {
      event.preventDefault();
      return false;
    }
    return onClick(event);
  };

  const toggleClose = (event, func) => {
    event.target.classList.toggle(styles.close);
    func(event);
  };

  const classes = ['btn', styles[className]];

  return (
    <>
      {type === 'submit' ? (
        <button
          className={classes.join(' ')}
          type={type}
        >
          {children}

        </button>
      )
        : (
          <button
            className={classes.join(' ')}
            onClick={(event) => {
              if (isMobile) {
                toggleClose(event, onClickAction);
              } else {
                onClickAction(event);
              }
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
