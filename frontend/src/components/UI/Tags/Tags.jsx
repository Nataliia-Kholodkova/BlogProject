import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Tags.module.css';

const Tags = ({
  tagList, onClick, itemStyle, linkStyle,
}) => (
  <ul className={styles.tagList}>
    {tagList.map((tag) => (
      <li key={`${tag}`} className={styles[itemStyle]}>
        <NavLink to={`/posts/tag/${tag}`} className={styles[linkStyle]} onClick={(event) => onClick(event, tag)}>
          {tag}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default Tags;
