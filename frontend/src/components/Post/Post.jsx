import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Post.module.css';
import Image from '../Common/Image/Image';
import Tags from '../UI/Tags/Tags';
import Like from '../Common/Image/Like';
import { AuthContext } from '../../context/userAuthContext';
import Button from '../UI/Button/Button';
import avatarMale from '../../assets/avatar_male.png';
import avatarFemale from '../../assets/avatar_female.png';

const Post = ({ children, ...props }) => {
  const {
    post,
    filter,
    setFilter,
    updateLikeHandler,
    deletePost,
    setPost,
    showButtons,
    isSingle,
  } = props;
  const {
    ownerUid,
    image, publishDate, text, likes, tags,
    _id,
    user,
  } = post;
  const hist = useHistory();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const isLiked = currentUser?.likedPosts
    .find((currentPost) => currentPost === post._id);
  const onTagClick = (event, tagName) => {
    event.stopPropagation();
    setFilter({ ...filter, tagName });
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
            src={user?.picture?.large ?? user?.picture ?? (user.gender === 'female' ? avatarFemale : avatarMale)}
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
          <Image src={image} alt="Post image" className="postImageRect" />
          <div className={styles.likesContainer}>
            <a
              href="/"
              onClick={async (event) => {
                event.preventDefault();
                if (ownerUid === currentUser._id) {
                  return false;
                }
                const like = isLiked ? -1 : 1;
                let likedPosts = [...currentUser.likedPosts];
                updateLikeHandler(post._id, like);
                if (!isLiked) {
                  likedPosts.push(post._id);
                } else {
                  likedPosts = likedPosts.filter((currentPost) => currentPost !== post._id);
                }
                if (setPost) {
                  setPost({ ...post, likes: likes + like });
                }
                setCurrentUser({ ...currentUser, likedPosts });
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
            itemStyle="tagItemSmall"
            linkStyle="tagLinkSmall"
          />
        </div>
        {currentUser?._id === ownerUid && showButtons && (
          <div className={styles.buttonsContainer}>
            <Button
              onClick={() => {
                hist.push(`/posts/update/${_id}`);
              }}
              className="btnGood"
              type="button"
            >
              Update
            </Button>
            <Button
              onClick={
              async () => {
                await deletePost(_id);
                hist.push('/posts');
              }
          }
              className="btnDelete"
              type="button"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      {children || null}
    </div>
  );
};

export default Post;
