import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Aside.module.css';

const Aside = ({ currentUser }) => (
  <aside className={styles.aside}>
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <NavLink className={styles.navLink} activeClassName={styles.active} to="/posts">
          <i className={`far fa-address-book ${styles.far}`} />
          Posts
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink className={styles.navLink} activeClassName={styles.active} to="/users">
          <i className={`fas fa-users ${styles.far}`} />
          Users
        </NavLink>
      </li>
      {currentUser && (
      <>
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} activeClassName={styles.active} to="/posts/me/liked">
            <i className={`far fa-heart ${styles.far}`} />
            Favourite posts
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} activeClassName={styles.active} to="/users/me/followed">
            <i className={`far fa-kiss-wink-heart ${styles.far}`} />
            Followed users
          </NavLink>
        </li>
      </>
      )}
    </ul>
  </aside>
);

export default Aside;
