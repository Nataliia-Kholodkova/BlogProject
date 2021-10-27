import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import useSortedAndSelectedPosts from '../../customHooks/usePostsSelect';
import Posts from '../Posts/Posts';
import { setPostsActionCreator, setPostsCurrentIndexActionCreator } from '../../redux/actionCreators/postsActionCreators';
import useObserver from '../../customHooks/useObserver';

const LIMIT = 10;

const PostsContainer = ({ filter, userId = null, tagName, setTagName, stateData, setPosts, setPostsCurrentIndex }) => {
  const lastElem = useRef();
  const { posts, isLoad, startingIndex  } = stateData;

  useEffect(() => {
    if (Object.keys(posts).length === 0) {
      setPosts()
    }
  }, []);

  useObserver(lastElem, isLoad, startingIndex <= Object.keys(posts).length, () => { setPostsCurrentIndex(startingIndex + LIMIT) });


  const sortedAndSelectedPosts = Object.fromEntries(Object.entries(useSortedAndSelectedPosts(posts,
    filter.tagName,
    filter.order)).slice(startingIndex, startingIndex + LIMIT));

  return (
    <>
      <Posts isLoad={isLoad} posts={sortedAndSelectedPosts} setTagName={setTagName} />
      <div className="lastDiv" ref={lastElem} />
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setPosts: (limit, page, userId, tagName) => dispatch(setPostsActionCreator(limit, page, userId, tagName)),
  setPostsCurrentIndex: (payload) => dispatch(setPostsCurrentIndexActionCreator(payload)),
})

const mapStateToProps = (state) => ({
  stateData: state.posts
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
