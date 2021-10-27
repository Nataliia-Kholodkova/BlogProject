import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostById, createComment } from '../../utils/processData';
import Post from '../Post/Post';
import Comments from '../Comments/Comments';
import Preloader from '../Common/Preloader/Preloader';
import {
  updatePostLikesActionCreator,
  deletePostActionCreator,
  updatePosts,
} from '../../redux/actionCreators/postsActionCreators';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';

const PostPage = ({ setFilter, updatePostLikes, deletePost }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoad, setLoad] = useState(false);
  const [error, setError] = useState('');
  const [addComment, setAddComment] = useState(false);

  useEffect(() => {
    setLoad(true);
    getPostById(id)
      .then((postData) => setPost(postData.data.post))
      .catch((e) => setError(e.message))
      .finally(() => setLoad(false));
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const response = await createComment(id, values);
      if (response.status !== 200) {
        setAddComment(false);
      }
      const createdComment = await response.data.comment;
      post.comments.push(createdComment);
      setPost(post);
      updatePosts(post);
      setAddComment(false);
    } catch {
      setError('Something went wrong...');
    }
  };

  return (
    <>
      {post && (
        <Post
          post={post}
          setTagName={setFilter}
          updateLikeHandler={updatePostLikes}
          deletePost={deletePost}
          setPost={setPost}
          showButtons
          isSingle
        >
          <Comments comments={post.comments} post={post} setPost={setPost} />
          <Button
            type="button"
            onClick={() => {
              setAddComment(!addComment);
            }}
            className="btnGood"
          >
            Add comment
          </Button>
          {addComment && (
            <Form
              classname="formComment"
              initialValues={{
                message: '',
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
        </Post>
      )}
      {isLoad && <Preloader />}
      {error && <Modal message={error} setMessage={setError} />}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updatePostLikes: (id, like) => dispatch(updatePostLikesActionCreator(id, like)),
  deletePost: (id) => dispatch(deletePostActionCreator(id)),
});

const mapStateToProps = (state) => ({
  stateData: state.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
