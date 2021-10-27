/* eslint-disable max-len */
import React, { useState, useContext } from 'react';
import styles from './App.module.css';
import { AuthContext } from '../../context/userAuthContext';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import { PublicRoutes, PrivateRoutes } from '../../utils/routes';

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const [postFilter, setPostFilter] = useState({
    tagName: '',
    order: 'random',
  });
  return (
    <>
      <Header className={styles.header} />
      <div className={styles.container}>
        <Aside className={styles.aside} filter={postFilter} setFilter={setPostFilter} />
        <main className={styles.main}>
          {currentUser ? <PrivateRoutes postFilter={postFilter} setPostFilter={setPostFilter} /> : <PublicRoutes postFilter={postFilter} setPostFilter={setPostFilter} />}
        </main>
      </div>
    </>
  );
};

export default App;
