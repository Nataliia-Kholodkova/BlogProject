import React, { useRef } from 'react';
import Post from '../Post/Post';
import Preloader from '../Common/Preloader/Preloader';
import useObserver from '../../customHooks/useObserver';
import Modal from '../UI/Modal/Modal';

const Posts = ({
  isLoad, posts, setTag, tag,
  currentPage, setCurrentPage, error,
  canLoad, setError, setPosts, setReset,
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
            setTag={setTag}
            tag={tag}
            setPosts={setPosts}
            setError={setError}
            setReset={setReset}
          />
        ))}
        {isLoad && <Preloader className="preloaderImage" />}
        <div className="lastDiv" ref={lastElem} />
      </>
      )}
      {error && <Modal setShowModal={setError} isError><h1>{error}</h1></Modal>}
    </>
  );
};

export default Posts;
