import React, { useRef } from 'react';
import Post from '../Post/Post';
import Preloader from '../Common/Preloader/Preloader';
import useObserver from '../../customHooks/useObserver';
import Modal from '../UI/Modal/Modal';

const Posts = ({
  isLoad, posts, setFilter, filter,
  currentPage, setCurrentPage, error,
  canLoad, updateLikeHandler, deletePost, setError,
}) => {
  const lastElem = useRef();
  useObserver(lastElem, isLoad,
    (posts.length > 0 && canLoad), () => { setCurrentPage(currentPage + 1); });
  return (
    <>
      {!error && (
      <>
        {posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            setFilter={setFilter}
            filter={filter}
            updateLikeHandler={updateLikeHandler}
            deletePost={deletePost}
          />
        ))}
        {isLoad && <Preloader className="preloaderImage" />}
        <div className="lastDiv" ref={lastElem} />
      </>
      )}
      {error && <Modal message={error} setMessage={setError} />}
    </>
  );
};

export default Posts;
