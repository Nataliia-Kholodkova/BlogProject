import React from 'react';
import spinner from '../../../assets/spinner.svg';
import Image from '../Image/Image';
import styles from './Preloader.module.css';

export default function Preloader({ className }) {
  return (
    <div className={styles.container}>
      <Image className={className} src={spinner} alt="Preloader image spinner" />
    </div>
  );
}
