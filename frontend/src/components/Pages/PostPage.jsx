import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import Comments from '../Comments/Comments';
import Preloader from '../Common/Preloader/Preloader';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import { getPostById, createComment } from '../../utils/processData';
import { fetchCommentAction } from '../../utils/dataFunctions';

const PostPage = ({ tag, setTag }) => {
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
    await fetchCommentAction(id, values, post, setPost, createComment, setAddComment, setError);
  };

  return (
    <>
      {post && (
        <Post
          post={post}
          tag={tag}
          setTag={setTag}
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
      {isLoad && <Preloader className="preloaderImage" />}
      {error && <Modal setShowModal={setError} isError><h1>{error}</h1></Modal>}
    </>
  );
};

export default PostPage;
