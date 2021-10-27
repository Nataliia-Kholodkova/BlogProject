import { combineReducers } from 'redux';
import postsReduser from './postsReducer';
import usersReducer from './usersReducer';

const root = combineReducers({
  posts: postsReduser,
  users: usersReducer,
});

export default root;
