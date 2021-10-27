import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Users from '../Users/Users';
import {
  setUsersPageActionCreator, loadUsers, setUsersErrorActionCreator, setUsersShouldLoadActionCreator,
} from '../../redux/actionCreators/usersActionCreators';
import Preloader from '../Common/Preloader/Preloader';
import Modal from '../UI/Modal/Modal';

const UsersPage = ({
  usersData, getUsers, setPage, setError, setShouldLoad,
}) => {
  const {
    users, currentPage, error, isLoad, canLoad, shouldLoad,
  } = usersData;

  useEffect(() => {
    if (shouldLoad) {
      getUsers(currentPage);
    }
    setShouldLoad(true);

    return () => {
      setShouldLoad(false);
    };
  }, [currentPage]);

  return (
    <>
      <Users
        users={users}
        setPage={setPage}
        currentPage={currentPage}
        isLoad={isLoad}
        canLoad={canLoad}
      />
      {isLoad && <Preloader />}
      {error && <Modal message={error} setMessage={setError} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  usersData: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: (page) => dispatch(loadUsers(page)),
  setPage: (page) => dispatch(setUsersPageActionCreator(page)),
  setError: (error) => dispatch(setUsersErrorActionCreator(error)),
  setShouldLoad: (payload) => dispatch(setUsersShouldLoadActionCreator(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
