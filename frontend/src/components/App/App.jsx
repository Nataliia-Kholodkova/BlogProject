import React, { useState, useContext } from 'react';
import styles from './App.module.css';
import { AuthContext } from '../../context/userAuthContext';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import { PublicRoutes, PrivateRoutes } from '../../utils/routes';
import PostCreateUpdate from '../Pages/PostCreateUpdate';

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const [tag, setTag] = useState('');
  const [reset, setReset] = useState(false);
  return (
    <>
      <Header className={styles.header} />
      <div className={styles.container}>
        <Aside className={styles.aside} currentUser={currentUser} />
        <main className={styles.main}>
          {currentUser ? (
            <>
              <div className={styles.createContainer}>
                <PostCreateUpdate formClassName="inlineForm" setReset={setReset} />
              </div>
              <PrivateRoutes tag={tag} setTag={setTag} reset={reset} setReset={setReset} />
            </>
          ) : <PublicRoutes tag={tag} setTag={setTag} />}
        </main>
      </div>
    </>
  );
};

export default App;
