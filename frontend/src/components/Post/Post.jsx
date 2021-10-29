import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image/Image';
import Tags from '../UI/Tags/Tags';
import Like from '../Common/Image/Like';
import Button from '../UI/Button/Button';
import avatarMale from '../../assets/avatar_male.png';
import avatarFemale from '../../assets/avatar_female.png';
import noImg from '../../assets/no_image.png';
import { fetchUpdateLike } from '../../utils/dataFunctions';
import { deletePost } from '../../utils/processData';
import PostCreateUpdate from '../Pages/PostCreateUpdate';
import Modal from '../UI/Modal/Modal';
import { AuthContext } from '../../context/userAuthContext';
import styles from './Post.module.css';

const Post = ({ children, ...props }) => {
  const {
    post,
    tag,
    setTag,
    setPost,
    isSingle,
    setPosts,
    setError,
    setReset,
  } = props;
  const {
    ownerUid,
    image, publishDate, text, likes, tags,
    _id,
    user,
  } = post;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [btnDisabled, setBtntDisabled] = useState(false);
  const isLiked = currentUser?.likedPosts
    .find((currentPost) => currentPost === post._id);
  const onTagClick = (event, tagName) => {
    event.stopPropagation();
    if (tag === tagName) {
      setTag('');
    } else {
      setTag(tagName);
    }
  };
  return (
    <div
      className={`${styles.post} ${isSingle ? styles.single : ''}`}
    >
      <div
        className={styles.postUser}
      >
        <div className={styles.userImageContainer}>
          <Image
            src={user?.picture?.large ?? user?.picture ?? (user?.gender === 'female' ? avatarFemale : avatarMale)}
            alt={`${user.firstName} ${user.lastName}`}
            className="userImageRoundSmall"
            circle
          />
        </div>
        <div className={styles.userInfoContainer}>
          <Link to={`/users/${ownerUid}`} className={styles.userTitle}>
            {user.firstName}
            {' '}
            {user.lastName}
          </Link>
          <p className={styles.date}>{new Date(publishDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className={styles.postContent}>
        <div className={styles.postImgContainer}>
          <Image src={image ?? noImg} alt="Post image" className="postImageRect" />
          <div className={styles.likesContainer}>
            <a
              href="/"
              onClick={async (event) => {
                event.preventDefault();
                if (ownerUid === currentUser._id) {
                  return false;
                }
                const likedPosts = [...currentUser.likedPosts];
                try {
                  await fetchUpdateLike(post, isLiked, likedPosts, currentUser,
                    setCurrentUser, setError, setPost, setPosts);
                } catch {
                  return false;
                }
                return true;
              }}
            >
              <Like className={isLiked ? 'liked' : ''} />
            </a>
            <span>{likes}</span>
          </div>
        </div>
        <div className={styles.postBodyContainer}>
          <Link to={`/posts/${_id}`} className={styles.postText}>{text}</Link>
          <Tags
            tagList={tags}
            onClick={onTagClick}
            currentTag={tag}
          />
        </div>
        {currentUser?._id === ownerUid && (
          <div className={styles.buttonsContainer}>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              type="button"
              disabled={btnDisabled}
            >
              <i className={`far fa-edit ${styles.farEdit}`} />
            </Button>
            <Button
              onClick={
                async () => {
                  if (btnDisabled) {
                    return;
                  }
                  try {
                    setBtntDisabled(true);
                    await deletePost(_id);
                    if (setPosts) {
                      setPosts((oldPosts) => oldPosts.filter((p) => p._id !== post._id));
                    }
                    setBtntDisabled(false);
                  } catch {
                    setError('Something went wrong');
                    setBtntDisabled(false);
                  }
                }
          }
              type="button"
              disabled={btnDisabled}
            >
              <i className={`far fa-trash-alt ${styles.farDelete}`} />
            </Button>
          </div>
        )}
      </div>
      {children || null}
      {showModal && (
      <Modal setShowModal={setShowModal}>
        <PostCreateUpdate formClassName="columnForm" currentPost={post} setReset={setReset} />
      </Modal>
      )}
    </div>
  );
};

export default Post;
