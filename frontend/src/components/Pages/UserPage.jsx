import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getUserPosts } from '../../utils/processData';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import Modal from '../UI/Modal/Modal';

const UserPage = ({ filter, setFilter }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState('');
  const [isUserLoad, setUserLoad] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState('');
  const [page, setPage] = useState(0);
  const [isPostsLoad, setPostsLoad] = useState(false);
  const [canLoad, setCanLoad] = useState(true);

  useEffect(() => {
    setUserLoad(true);
    getUser(id)
      .then((userData) => {
        setUser(userData.data.user);
      })
      .catch((e) => setUserError(e.message))
      .finally(() => setUserLoad(false));
  }, [id]);

  useEffect(() => {
    setPostsLoad(true);
    getUserPosts(page, id)
      .then((postsData) => {
        if (postsData.data.posts.length === 0) {
          setCanLoad(false);
          return;
        }
        setPosts([...posts, ...postsData.data.posts]);
      })
      .catch((e) => setPostsError(e.message))
      .finally(() => setPostsLoad(false));
  }, [page]);

  if (userError) {
    return <Modal message={userError} setMessage={setUserError} />;
  }
  return (
    <>
      {!isUserLoad && user && posts && (
      <>
        <Profile user={user} isLoad={isUserLoad} />
        <Posts
          filter={filter}
          setFilter={setFilter}
          posts={posts}
          isLoad={isPostsLoad}
          currentPage={page}
          setCurrentPage={setPage}
          error={postsError}
          canLoad={canLoad}
          setError={setPostsError}
        />
        ;
      </>
      )}
    </>
  );
};

export default UserPage;
