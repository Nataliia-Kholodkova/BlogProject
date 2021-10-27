import React from 'react';
import styles from './Image.module.css';

const Image = ({
  src, alt, className,
}) => (
  <img className={styles[className]} src={src} alt={alt} />
);

export default Image;
