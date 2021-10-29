import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image/Image';
import Preloader from '../Common/Preloader/Preloader';
import { AuthContext } from '../../context/userAuthContext';
import avatarMale from '../../assets/avatar_male.png';
import avatarFeale from '../../assets/avatar_female.png';
import styles from './Profile.module.css';

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
            <div className={styles.contactGroup}>
              <i className={`fas fa-map-marker-alt ${styles.far}`} />
              <span className={styles.city}>
                {`${country}, ${state}`}
                {`${city}, ${pageUser?.street?.name} ${pageUser?.street?.number ?? ''}`}
              </span>
            </div>
            <div className={styles.contactGroup}>
              <i className={`far fa-envelope ${styles.far}`} />
              <span className={styles.city}>
                {`${email}`}
              </span>
            </div>
            <div className={styles.contactGroup}>
              <i className={`fas fa-phone-volume ${styles.far}`} />
              <span className={styles.city}>
                {`${phone}`}
              </span>
            </div>
            <div className={styles.contactGroup}>
              <i className={`fas fa-mobile-alt ${styles.far}`} />
              <span className={styles.city}>
                {`${cell}`}
              </span>
            </div>
          </>
          )}
        </div>
        {pageUser._id === currentUser?._id && (
        <div className={styles.buttonsContainer}>
          <Link className={styles.btnGood} to="/me/update">Edit Profile</Link>
          <Link className={styles.btnGood} to="/me/update/password">Change Password</Link>
        </div>
        )}
      </div>
      {isLoad && <Preloader className="preloaderImage" />}
    </>
  );
};

export default Profile;
