import React, { useRef } from 'react';
import User from '../User/User';
import useObserver from '../../customHooks/useObserver';

const Users = ({
  isLoad, users, setPage, currentPage, canLoad,
}) => {
  const lastElem = useRef();
  useObserver(lastElem, isLoad, (users.length > 0 && canLoad), () => { setPage(currentPage + 1); });
  return (
    <>
      {users.map((user) => <User user={user} key={user._id} />)}
      <div className="lastDiv" ref={lastElem} />
    </>
  );
};
export default Users;
