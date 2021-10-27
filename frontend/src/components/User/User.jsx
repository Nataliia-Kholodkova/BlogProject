import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './User.module.css';
import Image from '../Common/Image/Image';
import { AuthContext } from '../../context/userAuthContext';
import { updateMeFriends } from '../../utils/processData';
import Button from '../UI/Button/Button';
import avatarMale from '../../assets/avatar_male.png';
import avatarFemale from '../../assets/avatar_female.png';

const User = ({ user }) => {
  const {
    firstName, picture, lastName, _id, gender,
  } = user;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const isFriend = currentUser?.followedUsers.includes(_id);
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
        onClick={async () => {
          const friends = [...currentUser.followedUsers];
          if (isFriend) {
            friends.filter((friend) => friend !== _id);
          } else {
            friends.push(_id);
          }
          const response = await updateMeFriends({ followedUsers: friends });
          if (response.status !== 200) {
            return false;
          }
          setCurrentUser({ ...currentUser, followedUsers: friends });
          return true;
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
