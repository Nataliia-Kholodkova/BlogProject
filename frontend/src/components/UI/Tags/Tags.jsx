import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Tags.module.css';

const Tags = ({
  tagList, onClick, currentTag,
}) => (
  <ul className={styles.tagList}>
    {tagList.map((tag) => (
      <li key={`${tag}`} className={`${styles.tagItemSmall} ${currentTag === tag ? `${styles.current}` : ''}`}>
        <Link to="/" className={styles.tagLinkSmall} onClick={(event) => onClick(event, tag)}>
          {tag}
        </Link>
      </li>
    ))}
  </ul>
);

export default Tags;
