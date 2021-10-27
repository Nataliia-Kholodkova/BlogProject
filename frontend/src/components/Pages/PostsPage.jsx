import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useSortedAndSelectedPosts from '../../customHooks/usePostsSelect';
import Posts from '../Posts/Posts';
import {
  loadPosts, setPostsCurrentPageActionCreator,
  updatePostLikesActionCreator, deletePostActionCreator,
  setPostErrorActionCreator, setPostShouldLoadActionCreator,
} from '../../redux/actionCreators/postsActionCreators';

const PostsContainer = ({
  filter, setFilter, stateData, setPosts,
  setCurrentPage, updatePostLikes, deletePost, setError,
  setShouldLoad,
}) => {
  const {
    posts, isLoad, currentPage, canLoad,
    error, shouldLoad,
  } = stateData;

  useEffect(() => {
    if (shouldLoad) {
      setPosts(currentPage);
    }
    setShouldLoad(true);

    return () => {
      setShouldLoad(false);
    };
  }, [currentPage]);

  const sortedAndSelectedPosts = useSortedAndSelectedPosts(posts,
    filter.tagName,
    filter.order);

  return (
    <>
      <Posts
        isLoad={isLoad}
        posts={sortedAndSelectedPosts}
        setFilter={setFilter}
        filter={filter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        canLoad={canLoad}
        updateLikeHandler={updatePostLikes}
        deletePost={deletePost}
        error={error}
        setError={setError}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setPosts: (page) => dispatch(loadPosts(page)),
  setCurrentPage: (payload) => dispatch(setPostsCurrentPageActionCreator(payload)),
  updatePostLikes: (id, like) => dispatch(updatePostLikesActionCreator(id, like)),
  deletePost: (id) => dispatch(deletePostActionCreator(id)),
  setError: (error) => dispatch(setPostErrorActionCreator(error)),
  setShouldLoad: (payload) => dispatch(setPostShouldLoadActionCreator(payload)),
});

const mapStateToProps = (state) => ({
  stateData: state.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
