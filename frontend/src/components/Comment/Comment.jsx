import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image/Image';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import avatarMale from '../../assets/avatar_male.png';
import avatarFemale from '../../assets/avatar_female.png';
import { fetchCommentAction } from '../../utils/dataFunctions';
import { AuthContext } from '../../context/userAuthContext';
import { updateComment, deleteComment } from '../../utils/processData';
import styles from './Comment.module.css';

const Comment = ({ comment, post, setPost }) => {
  const { currentUser } = useContext(AuthContext);
  const {
    user, message, publishDate, ownerUid, _id,
  } = comment;
  const [isUpdateComment, setUpdateComment] = useState(false);
  const [error, setError] = useState(null);
  const [btnDusabled, setBtnDisabled] = useState(false);
  const handleSubmit = async (values) => {
    await fetchCommentAction(_id, values, post, setPost,
      updateComment, setUpdateComment, setError);
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
                if (btnDusabled) {
                  return;
                }
                setUpdateComment(!isUpdateComment);
              }}
              className="btnGood"
              type="button"
              disabled={btnDusabled}
            >
              Update
            </Button>
            <Button
              onClick={async () => {
                if (btnDusabled) {
                  return;
                }
                setBtnDisabled(true);
                const response = await deleteComment(_id);
                if (response.status !== 200) {
                  setBtnDisabled(false);
                  return;
                }
                const newPost = { ...post };
                newPost.comments = newPost.comments.filter((c) => c._id !== _id);
                setPost(newPost);
                setBtnDisabled(false);
              }}
              className="btnDelete"
              type="button"
              disabled={btnDusabled}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      {error && (
      <Modal message={error} setShowModal={setError} isError>
        <h1>{error}</h1>
      </Modal>
      )}
    </>
  );
};

export default Comment;
