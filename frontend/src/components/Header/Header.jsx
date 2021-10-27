import React, { useRef, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../UI/Button/Button';
import { signout } from '../../utils/processData';
import { AuthContext } from '../../context/userAuthContext';

const Header = () => {
  const { currentUser, setCurrentUser, setLogedIn } = useContext(AuthContext);
  const ref = useRef(null);
  const hist = useHistory();
  const toggleClassRef = () => ref.current.classList.toggle(styles.open);
  return (
    <header className={styles.header}>
      <nav>
        <Button
          onClick={toggleClassRef}
          className="mobileShow"
          type="button"
          isMobile
        >
          <span />
        </Button>
        <ul className={`list ${styles.navList}`} ref={ref}>
          <li className={styles.navItem}>
            <NavLink
              exact
              to="/posts"
              activeClassName={styles.active}
              className={`link ${styles.navLink}`}
            >
              Posts
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/users"
              activeClassName={styles.active}
              className={`link ${styles.navLink}`}
            >
              Users
            </NavLink>
          </li>
          {currentUser && (
          <>
            <li className={styles.navItem}>
              <NavLink
                to="/posts/create/new"
                activeClassName={styles.active}
                className={`link ${styles.navLink}`}
              >
                New Post
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/me"
                activeClassName={styles.active}
                className={`link ${styles.navLink}`}
              >
                Profile
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/signout"
                activeClassName={styles.active}
                className={`link ${styles.navLink}`}
                onClick={async () => {
                  const response = await signout();
                  if (response.status !== 200) {
                    console.log('error');
                    return;
                  }
                  setCurrentUser(null);
                  setLogedIn(false);
                  hist.goBack();
                }}
              >
                Sign Out
              </NavLink>
            </li>
          </>
          )}
          {!currentUser && (
          <>
            <li className={styles.navItem}>
              <NavLink
                to="/signup"
                activeClassName={styles.active}
                className={`link ${styles.navLink}`}
              >
                Sign Up
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/signin"
                activeClassName={styles.active}
                className={`link ${styles.navLink}`}
              >
                Sign In
              </NavLink>
            </li>
          </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
