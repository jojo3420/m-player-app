import { createAction, handleActions } from 'redux-actions';
import makeActionTypes from 'lib/makeActionTypes';
import createRequestThunk from 'lib/createRequestThunk';
import * as authApi from 'lib/api/auth';
import produce from 'immer';

// Action
const PREFIX = 'auth';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = makeActionTypes(
  `${PREFIX}/LOGIN`,
);
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = makeActionTypes(
  `${PREFIX}/LOGOUT`,
);
const [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE] = makeActionTypes(
  `${PREFIX}/SIGN_UP`,
);

const [CHECK_LOGIN, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_FAILURE] = makeActionTypes(
  `${PREFIX}/CHECK_LOGIN`,
);
const [TEMP_SET_USER, ,] = makeActionTypes(`${PREFIX}/TEMP_SET_USER`);

// Action Creator
export const onLogin = createRequestThunk(LOGIN, authApi.login);
export const onLogout = createRequestThunk(LOGOUT, authApi.logout);
export const onSignUp = createRequestThunk(SIGN_UP, authApi.signUp);
export const onCheckLogin = createRequestThunk(CHECK_LOGIN, authApi.checkLogin);
export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);

// State
const initialState = {
  user: null,
  login: {
    responseMessage: '',
    status: null,
    e: null,
  },
  signUp: {
    responseMessage: '',
    status: null,
    e: null,
  },
  check: {
    logged: false,
    e: null,
  },
  logout: {
    e: null,
  },
};

function removeUserByLocalStorage() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('removeUserByLocalStorage() - user is not removed..' + e);
  }
}

// Reducer
const auth = handleActions(
  {
    [SIGN_UP_SUCCESS]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft.user = user;
        draft.signUp = initialState.signUp;
      }),
    [SIGN_UP_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.signUp.responseMessage = e.response.data.message;
        draft.signUp.status = e.response.status;
        draft.signUp.e = e;
      }),
    [LOGIN_SUCCESS]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft.user = user;
        draft.login = initialState.login;
      }),
    [LOGIN_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.login.responseMessage = e.response.data.message;
        draft.login.status = e.response.status;
        draft.login.e = e;
      }),
    [LOGOUT_SUCCESS]: () => {
      removeUserByLocalStorage();
      return initialState;
    },
    [LOGOUT_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.logout.e = e;
      }),
    [CHECK_LOGIN_SUCCESS]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft.check.logged = true;
        draft.check.e = null;
        draft.user = user;
      }),
    [CHECK_LOGIN_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.check.logged = false;
        draft.check.e = e;
        draft.user = null;
        removeUserByLocalStorage();
      }),
    [TEMP_SET_USER]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft.user = user;
      }),
  },
  initialState,
);

export default auth;
