import React, { useEffect, useState } from 'react';
import Posts from '../Posts/Posts';
import { fetchData } from '../../utils/dataFunctions';
import useSelectedPosts from '../../customHooks/usePostsSelect';

const PostsContainer = ({
  tag, setTag, setPostsFunction,
}) => {
  const [isLoad, setIsLoad] = useState(false);
  const [posts, setPosts] = useState([]);
  const [canLoad, setCanLoad] = useState(false);
  const [error, setError] = useState(null);
  const [shouldLoad, setShouldLoad] = useState(true);
  const [page, setPage] = useState(0);

  const [reset, setReset] = useState(false);

  if (reset) {
    setCanLoad(false);
    setPage(0);
    setPosts([]);
    setShouldLoad(true);
    setReset(false);
  }

  useEffect(() => {
    const fetch = async () => {
      if (shouldLoad) {
        await fetchData(setPostsFunction, page, setIsLoad, setPosts, setError, setCanLoad);
      }
      setShouldLoad(true);
    };
    fetch();

    return () => {
      setShouldLoad(false);
    };
  }, [page]);
  const selectedPosts = useSelectedPosts(posts, tag);

  return (
    <>
      <Posts
        isLoad={isLoad}
        posts={selectedPosts}
        setTag={setTag}
        tag={tag}
        currentPage={page}
        setCurrentPage={setPage}
        canLoad={canLoad}
        error={error}
        setError={setError}
        setPosts={setPosts}
      />
    </>
  );
};

export default PostsContainer;
