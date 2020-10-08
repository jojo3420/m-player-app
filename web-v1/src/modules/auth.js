import { createAction, handleActions } from 'redux-actions'
import makeActionTypes from 'lib/makeActionTypes'
import createRequestThunk from 'lib/createRequestThunk'
import * as api from 'lib/api/auth'
import produce from 'immer'
// import { clearToken } from 'lib/localStorage'
import { takeLatest, throttle } from 'redux-saga/effects'
import createRequestSaga from 'lib/createRequestSaga'

// Action
const PREFIX = 'auth'
const [SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE] = makeActionTypes(
  `${PREFIX}/SIGN_IN`,
)
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = makeActionTypes(
  `${PREFIX}/LOGOUT`,
)
const [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE] = makeActionTypes(
  `${PREFIX}/SIGN_UP`,
)
const [CHECK_LOGIN, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_FAILURE] = makeActionTypes(
  `${PREFIX}/CHECK_LOGIN`,
)
const [IS_AVAILABLE_MEMBER, , IS_AVAILABLE_MEMBER_FAILURE] = makeActionTypes(
  `${PREFIX}/IS_AVAILABLE_MEMBER`,
)
const [SEND_SMS, SEND_SMS_SUCCESS, SEND_SMS_FAILURE] = makeActionTypes(
  `${PREFIX}/SEND_SMS`,
)
// const [
//   SEND_SMS_SAGA,
//   SEND_SMS_SAGA_SUCCESS,
//   SEND_SMS_SAGA_FAILURE,
// ] = makeActionTypes(`${PREFIX}/SEND_SMS_SAGA`)

// Action Creator
export const onIsAvailable = createRequestThunk(
  IS_AVAILABLE_MEMBER,
  api.isAvailable,
)
export const onSignIn = createRequestThunk(SIGN_IN, api.signIn)
export const onLogout = createRequestThunk(LOGOUT, api.logout)
export const onSignUp = createRequestThunk(SIGN_UP, api.signUp)
export const onCheckLogin = createRequestThunk(CHECK_LOGIN, api.checkLogin)
export const sendSMS = createRequestThunk(SEND_SMS, api.sendSMS)

// Saga Action Creator -
// export const onSignUp = createAction(SIGN_UP, (member) => member)
// export const sendSMS = createAction(SEND_SMS, (smsObj) => smsObj) // { to: '010-1234-1234', type: 'auth'}

// const signUpSaga = createRequestSaga(SIGN_UP, api.signUp)
// const sendSMSSaga = createRequestSaga(SEND_SMS_SAGA, api.sendSMS)

export function* authSaga() {
  // yield throttle(3000, SIGN_UP, signUpSaga)
  // yield throttle(3000, SEND_SMS, sendSMSSaga)
}

// State
const initialState = {
  auth: null,
  signIn: {
    msg: '',
    status: null,
    e: null,
  },
  available: {
    msg: '',
    status: '',
  },
  signUp: {
    msg: '',
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
  sms: {
    send: false,
    server: '',
  },
}

// Reducer
const auth = handleActions(
  {
    // [IS_AVAILABLE_MEMBER_SUCCESS]: (state, action) => {},
    [IS_AVAILABLE_MEMBER_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        const { error, response } = action
        // console.log({ e, error, response })
        draft.available.error = error
        draft.available.msg = response.data.msg
        draft.available.status = response.status
      }),
    [SIGN_UP_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.auth = auth
        // draft.signUp = initialState.signUp
      }),
    [SIGN_UP_FAILURE]: (state, { e, error, response }) =>
      produce(state, (draft) => {
        draft.auth = null
        draft.signUp.msg = response.data.msg
        draft.signUp.status = response.status
        draft.signUp.e = e
        draft.signUp.error = error
      }),
    [SIGN_IN_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.auth = auth
        draft.signIn = initialState.signIn
      }),
    [SIGN_IN_FAILURE]: (state, { e, error, response }) =>
      produce(state, (draft) => {
        draft.auth = null
        draft.signIn.msg = response.data.msg
        draft.signIn.status = response.status
        draft.signIn.e = e
        draft.signIn.error = error
      }),
    [LOGOUT_SUCCESS]: () => {
      // clearToken()
      return initialState
    },
    [LOGOUT_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.logout.e = e
      }),
    [CHECK_LOGIN_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.check.logged = true
        draft.check.e = null
        draft.auth = auth
      }),
    [CHECK_LOGIN_FAILURE]: (state, { e }) =>
      produce(state, (draft) => {
        draft.check.logged = false
        draft.check.e = e
        draft.auth = null
        // clearToken()
      }),
    [SEND_SMS_SUCCESS]: (state, { payload }) => {
      return produce(state, (draft) => {
        draft.sms.send = true
        draft.sms.msg = payload.msg
        draft.sms.server = payload.server
      })
    },
    [SEND_SMS_FAILURE]: (state, { error, response }) => {
      return produce(state, (draft) => {
        draft.sms.error = error
        draft.sms.msg = response.msg
      })
    },
    // [SEND_SMS_SAGA_SUCCESS]: (state, { payload }) => {
    //   return produce(state, (draft) => {
    //     draft.sms.send = true
    //     draft.sms.msg = payload.msg
    //     draft.sms.server = payload.server
    //   })
    // },
  },
  initialState,
)

export default auth
