import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image/Image';
import Button from '../UI/Button/Button';
import avatarMale from '../../assets/avatar_male.png';
import avatarFemale from '../../assets/avatar_female.png';
import { AuthContext } from '../../context/userAuthContext';
import { fetchFollowUpdate } from '../../utils/dataFunctions';
import styles from './User.module.css';

const User = ({ user }) => {
  const {
    firstName, picture, lastName, _id, gender,
  } = user;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const isFriend = currentUser?.followedUsers.includes(_id);
  const [btnDisabled, setBtntDisabled] = useState(false);
  return (
    <div className={styles.user}>
      <div className={styles.userImageContainer}>
        <Image src={picture ?? (gender === 'female' ? avatarFemale : avatarMale)} alt={`${firstName} ${lastName}`} className="userImageRoundSmall" />
      </div>
      <Link to={`/users/${_id}`} className={styles.userTitle}>
        {firstName}
        {' '}
        {lastName}
      </Link>
      {currentUser && (
      <Button
        type="button"
        disabled={btnDisabled}
        onClick={async () => {
          setBtntDisabled(true);
          await fetchFollowUpdate(_id, currentUser, isFriend, setCurrentUser);
          setBtntDisabled(false);
        }}
        className="btnGood"
      >
        {isFriend ? 'Unfollow' : 'Follow'}
      </Button>
      )}
    </div>
  );
};

export default User;
