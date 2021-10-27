import React, { useState, useEffect, useContext } from 'react';
import { getUserPosts } from '../../utils/processData';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import { AuthContext } from '../../context/userAuthContext';

const UserPage = ({ filter, setFilter }) => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState('');
  const [page, setPage] = useState(0);
  const [isPostsLoad, setPostsLoad] = useState(false);
  const [canLoad, setCanLoad] = useState(true);

  useEffect(() => {
    setPostsLoad(true);
    getUserPosts(page, currentUser?._id)
      .then((postsData) => {
        if (postsData.data.posts.length === 0) {
          setCanLoad(false);
          return;
        }
        setPosts([...posts, ...postsData.data.posts]);
      })
      .catch((e) => setPostsError(e.message))
      .finally(() => setPostsLoad(false));
  }, [page, currentUser?._id]);

  return (
    <>
      {currentUser && posts && (
      <>
        <Profile user={currentUser} />
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
