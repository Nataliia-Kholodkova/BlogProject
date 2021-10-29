import React, { useRef, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { signout } from '../../utils/processData';
import { AuthContext } from '../../context/userAuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { currentUser, setCurrentUser, setLogedIn } = useContext(AuthContext);
  const ref = useRef(null);
  const hist = useHistory();
  return (
    <header className={styles.header}>
      <nav>
        <ul className={`list ${styles.navList}`} ref={ref}>
          {currentUser && (
            <>
              <li className={styles.navItem}>
                <NavLink
                  to="/signout"
                  activeClassName={styles.active}
                  className={`link ${styles.navLink}`}
                  onClick={async () => {
                    const response = await signout();
                    if (response.status !== 200) {
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
              <li className={styles.navItem}>
                <NavLink
                  to="/me"
                  activeClassName={styles.navLinkUserActive}
                  className={`link ${styles.navLinkUser}`}
                >
                  {`${currentUser?.firstName
                    .charAt(0)
                    .toUpperCase()}${currentUser?.lastName
                    .charAt(0)
                    .toUpperCase()}`}
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
