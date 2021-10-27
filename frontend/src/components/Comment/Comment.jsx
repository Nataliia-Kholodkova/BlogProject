import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Comment.module.css';
import Image from '../Common/Image/Image';
import { AuthContext } from '../../context/userAuthContext';
import { updateComment, deleteComment } from '../../utils/processData';
import { updatePosts } from '../../redux/actionCreators/postsActionCreators';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import avatarMale from '../../assets/avatar_male.png';
import avatarFemale from '../../assets/avatar_female.png';

const Comment = ({ comment, post, setPost }) => {
  const { currentUser } = useContext(AuthContext);
  const {
    user, message, publishDate, ownerUid, _id,
  } = comment;
  const [isUpdateComment, setUpdateComment] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (values) => {
    try {
      const response = await updateComment(_id, values);
      if (response.status !== 200) {
        setUpdateComment(false);
      }
      const createdComment = await response.data.comment;
      const idx = post.comments.map((p) => p._id).findIndex((i) => i === _id);
      const newPost = { ...post };
      newPost.comments[idx] = createdComment;
      await updatePosts(newPost);
      setUpdateComment(false);
      setPost(newPost);
    } catch {
      setError('Something went wrong...');
    }
  };

  return (
    <>
      <div className={styles.comment}>
        <div
          className={styles.commentUser}
        >
          <div className={styles.userImageContainer}>
            <Image src={user?.picture?.large ?? user?.picture ?? (user.gender === 'female' ? avatarFemale : avatarMale)} alt={`${user.firstName} ${user.lastName}`} className="userImageRoundSmall" />
          </div>
          <div className={styles.userInfoContainer}>
            <Link className={styles.userTitle} to={`/users/${user.id}`}>
              {user.firstName}
              {' '}
              {user.lastName}
            </Link>
            <p className={styles.date}>{new Date(publishDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className={styles.commentContent}>
          <div className={styles.commentBodyContainer}>
            {!isUpdateComment && <p>{message}</p>}
            {isUpdateComment && (
              <Form
                classname="formComment"
                initialValues={{
                  message: message ?? '',
                }}
                handleSubmit={handleSubmit}
                fields={[
                  {
                    name: 'message',
                    type: 'text',
                    placeholder: 'Message',
                  }]}
              />
            )}
          </div>
        </div>
        {currentUser._id === ownerUid && (
          <div className={styles.buttonsContainer}>
            <Button
              onClick={() => {
                setUpdateComment(!isUpdateComment);
              }}
              className="btnGood"
              type="button"
            >
              Update
            </Button>
            <Button
              onClick={async () => {
                const response = await deleteComment(_id);
                if (response.status !== 200) {
                  return;
                }
                const newPost = { ...post };
                newPost.comments = newPost.comments.filter((c) => c._id !== _id);
                updatePosts(newPost);
                setPost(newPost);
              }}
              className="btnDelete"
              type="button"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      {error && <Modal message={error} setMessage={setError} />}
    </>
  );
};

export default Comment;
