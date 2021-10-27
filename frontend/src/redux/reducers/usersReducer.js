import {
  USERS_SET_USERS, USERS_SET_USERS_LOAD,
  USERS_SET_CURRENT_PAGE, USERS_SET_ERROR, USERS_SET_CAN_LOAD,
  USERS_SET_SHOULD_LOAD,
} from '../constants';

const initialState = {
  users: [],
  isLoad: false,
  currentPage: 0,
  error: null,
  canLoad: true,
  shouldLoad: true,
};

const usersReduser = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case USERS_SET_SHOULD_LOAD:
      newState.shouldLoad = payload;
      return newState;
    case USERS_SET_USERS:
      newState.users = [...newState.users, ...payload];
      return newState;
    case USERS_SET_USERS_LOAD:
      newState.isLoad = payload;
      return newState;
    case USERS_SET_CAN_LOAD:
      newState.canLoad = payload;
      return newState;
    case USERS_SET_CURRENT_PAGE:
      newState.currentPage = payload;
      return newState;
    case USERS_SET_ERROR:
      newState.error = payload;
      return newState;
    default:
      return state;
  }
};

export default usersReduser;
