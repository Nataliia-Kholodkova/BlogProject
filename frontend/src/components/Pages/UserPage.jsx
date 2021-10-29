import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import { getUser, getUserPosts } from '../../utils/processData';

const UserPage = ({ tag, setTag }) => {
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
    return <h1>userError</h1>;
  }
  return (
    <>
      {!isUserLoad && user && posts && (
      <>
        <Profile user={user} isLoad={isUserLoad} />
        <Posts
          tag={tag}
          setTag={setTag}
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
