import {
  POSTS_SET_POSTS, POSTS_SET_POSTS_LOAD,
  POSTS_SET_CURRENT_PAGE, POSTS_SET_ERROR,
  POSTS_UPDATE_POSTS, POSTS_SET_CAN_LOAD,
  POSTS_UPDATE_LIKES, POSTS_DELETE_POST,
  POSTS_CREATE_POST, POSTS_SET_SHOULD_LOAD,
} from '../constants';
import {
  getPosts, updatePostLikes, deletePost, createPost, updatePost,
} from '../../utils/processData';

export const setPostsCurrentPageActionCreator = (payload) => (
  { type: POSTS_SET_CURRENT_PAGE, payload }
);

export const updatePosts = (payload) => ({
  type: POSTS_UPDATE_POSTS, payload,
});

export const deletePostActionCreator = (payload) => async (dispatch) => {
  const response = await (deletePost(payload));
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  dispatch({ type: POSTS_DELETE_POST, payload });
};

export const createPostActionCreator = (payload) => async (dispatch) => {
  const response = await (createPost(payload));
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  const { post } = await response.data;
  dispatch({ type: POSTS_CREATE_POST, payload: post });
};

export const updatePostActionCreator = (id, payload) => async (dispatch) => {
  const response = await (updatePost(id, payload));
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  const { post } = await response.data;
  dispatch({ type: POSTS_UPDATE_POSTS, payload: post });
};

export const setPostCanLoadActionCreator = (payload) => (
  { type: POSTS_SET_CAN_LOAD, payload }
);

export const setPostsActionCreator = (payload) => ({ type: POSTS_SET_POSTS, payload });

export const updatePostLikesActionCreator = (postId, like) => async (dispatch) => {
  const response = await updatePostLikes(postId, { like });
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  dispatch({ type: POSTS_UPDATE_LIKES, payload: { id: postId, like } });
};

export const setPostErrorActionCreator = (payload) => (dispatch) => {
  dispatch({ type: POSTS_SET_ERROR, payload });
};

export const setPostShouldLoadActionCreator = (payload) => (dispatch) => {
  dispatch({ type: POSTS_SET_SHOULD_LOAD, payload });
};

export const loadPosts = (page) => async (dispatch) => {
  dispatch({ type: POSTS_SET_POSTS_LOAD, payload: true });
  try {
    const { data } = await getPosts(page);
    const { posts } = data;
    if (!posts) {
      throw new Error(data.message);
    }
    if (posts.length === 0) {
      dispatch({ type: POSTS_SET_CAN_LOAD, payload: false });
      return;
    }
    dispatch({ type: POSTS_SET_CAN_LOAD, payload: true });
    dispatch({ type: POSTS_SET_POSTS, payload: posts });
  } catch (error) {
    dispatch({ type: POSTS_SET_ERROR, payload: error });
  } finally {
    dispatch({ type: POSTS_SET_POSTS_LOAD, payload: false });
  }
};
