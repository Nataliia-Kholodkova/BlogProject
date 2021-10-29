import React, { useEffect, useState } from 'react';
import Users from '../Users/Users';
import Preloader from '../Common/Preloader/Preloader';
import Modal from '../UI/Modal/Modal';
import { fetchData } from '../../utils/dataFunctions';

const UsersPage = ({ setUsersFunction }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [canLoad, setCanLoad] = useState(false);
  const [error, setError] = useState(null);
  const [shouldLoad, setShouldLoad] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      if (shouldLoad) {
        fetchData(setUsersFunction, page, setIsLoad, setUsers, setError, setCanLoad);
      }
      setShouldLoad(true);
    };
    fetch();

    return () => {
      setShouldLoad(false);
    };
  }, [page]);

  return (
    <>
      <Users
        users={users}
        setPage={setPage}
        currentPage={page}
        isLoad={isLoad}
        canLoad={canLoad}
      />
      {isLoad && <Preloader className="preloaderImage" />}
      {error && <Modal setShowModal={setError} isError><h1>{error}</h1></Modal>}
    </>
  );
};

export default UsersPage;
