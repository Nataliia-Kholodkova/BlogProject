import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image/Image';
import styles from './Profile.module.css';
import Preloader from '../Common/Preloader/Preloader';
import { AuthContext } from '../../context/userAuthContext';
import avatarMale from '../../assets/avatar_male.png';
import avatarFeale from '../../assets/avatar_female.png';

const Profile = ({ user, isLoad }) => {
  const { currentUser } = useContext(AuthContext);
  const pageUser = user || currentUser;
  if (!pageUser) {
    return null;
  }
  const {
    gender,
    firstName,
    lastName,
    city,
    state,
    country,
    email,
    phone,
    cell,
    picture,
  } = pageUser;
  return (
    <>
      <div className={styles.user}>
        <div className={styles.userImageContainer}>
          <Image src={picture?.large ?? picture?.medium ?? (gender === 'female' ? avatarFeale : avatarMale)} alt={`${firstName} ${lastName}`} className="userImgBig" />
        </div>
        <div>
          <h1 className={styles.userTitle}>{`${firstName} ${lastName}`}</h1>
          {country && (
          <>
            <p className={styles.city}>{`${country}, ${state}`}</p>
            {currentUser && (
            <>
              <p className={styles.city}>{`${city}, ${pageUser?.street?.name}, ${pageUser?.street?.number}`}</p>
              <p className={styles.city}>{`Email: ${email}`}</p>
              <p className={styles.city}>{`Phone: ${phone}`}</p>
              <p className={styles.city}>{`Cell: ${cell}`}</p>
            </>
            )}
          </>
          )}
        </div>
        {pageUser._id === currentUser?._id && (
        <div className={styles.buttonsContainer}>
          <Link className={styles.btnGood} to="me/update">Edit Profile</Link>
          <Link className={styles.btnGood} to="me/update/password">Change Password</Link>
        </div>
        )}
      </div>
      {isLoad && <Preloader className="preloaderImage" />}
    </>
  );
};

export default Profile;
