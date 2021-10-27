import {
  POSTS_SET_POSTS, POSTS_SET_POSTS_LOAD,
  POSTS_SET_CURRENT_PAGE, POSTS_SET_ERROR,
  POSTS_UPDATE_POSTS, POSTS_SET_CAN_LOAD,
  POSTS_UPDATE_LIKES, POSTS_DELETE_POST,
  POSTS_CREATE_POST, POSTS_SET_SHOULD_LOAD,
} from '../constants';

const initialState = {
  posts: [],
  isLoad: false,
  currentPage: 0,
  error: null,
  canLoad: false,
  shouldLoad: true,
};

const updateLikes = ({ id, like, posts }) => {
  const newPosts = [...posts];
  const i = posts.findIndex((post) => post._id === id);
  const post = posts[i];
  post.likes += like;
  newPosts[i] = post;
  return newPosts;
};

const updatePost = (posts, post) => posts.map((p) => {
  if (p._id === post._id) {
    return post;
  }
  return p;
});

const postsReduser = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case POSTS_DELETE_POST:
      newState.posts = newState.posts.filter((post) => post._id !== payload);
      return newState;
    case POSTS_SET_SHOULD_LOAD:
      newState.shouldLoad = payload;
      return newState;
    case POSTS_SET_POSTS:
      newState.posts = [...newState.posts, ...payload];
      return newState;
    case POSTS_UPDATE_POSTS:
      newState.posts = updatePost(newState.posts, payload);
      return newState;
    case POSTS_CREATE_POST:
      newState.posts.unshift(payload);
      return newState;
    case POSTS_SET_CAN_LOAD:
      newState.canLoad = payload;
      return newState;
    case POSTS_SET_POSTS_LOAD:
      newState.isLoad = payload;
      return newState;
    case POSTS_SET_CURRENT_PAGE:
      newState.currentPage = payload;
      return newState;
    case POSTS_UPDATE_LIKES:
      newState.posts = updateLikes({ ...payload, posts: newState.posts });
      return newState;
    case POSTS_SET_ERROR:
      newState.error = payload;
      return newState;
    default:
      return state;
  }
};

export default postsReduser;
