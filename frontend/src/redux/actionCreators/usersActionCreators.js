import {
  USERS_SET_USERS, USERS_SET_USERS_LOAD,
  USERS_SET_CURRENT_PAGE, USERS_SET_ERROR, USERS_SET_CAN_LOAD,
  USERS_SET_SHOULD_LOAD,
} from '../constants';
import { getUsers } from '../../utils/processData';

export const setUsersShouldLoadActionCreator = (payload) => (dispatch) => {
  dispatch({ type: USERS_SET_SHOULD_LOAD, payload });
};

export const setUsersPageActionCreator = (payload) => ({ type: USERS_SET_CURRENT_PAGE, payload });

export const setUsersErrorActionCreator = (payload) => (dispatch) => {
  dispatch({ type: USERS_SET_ERROR, payload });
};

export const setUsersActionCreator = (payload) => ({ type: USERS_SET_USERS, payload });

export const loadUsers = (page) => async (dispatch) => {
  dispatch({ type: USERS_SET_USERS_LOAD, payload: true });
  try {
    const { data } = await getUsers(page);
    const { users } = data;
    if (!users) {
      throw new Error(data.message);
    }
    if (users.length === 0) {
      dispatch({ type: USERS_SET_CAN_LOAD, payload: false });
    }
    dispatch({ type: USERS_SET_USERS, payload: users });
  } catch (error) {
    dispatch({ type: USERS_SET_ERROR, payload: error });
  } finally {
    dispatch({ type: USERS_SET_USERS_LOAD, payload: false });
  }
};
