import { createAction, handleActions } from 'redux-actions'
import makeActionTypes from 'lib/makeActionTypes'
import createRequestThunk from 'lib/createRequestThunk'
import * as api from 'lib/api/playlist'
import produce from 'immer'

// Action
const PREFIX = 'playlist'
const [
  GET_PLAY_LIST_BY,
  GET_PLAY_LIST_BY_SUCCESS,
  GET_PLAY_LIST_BY_FAILURE,
] = makeActionTypes(`${PREFIX}/GET_PLAY_LIST_BY`)

// Action Creator
export const getPlayListBy = createRequestThunk(
  GET_PLAY_LIST_BY,
  api.getPlayListBy,
)

const INIT_STATE = {
  list: [],
}

const playListReducer = handleActions(
  {
    [GET_PLAY_LIST_BY_SUCCESS]: (state, { payload }) => {
      return produce(state, (draft) => {
        draft.list = draft.list.concat(payload.playlist)
      })
    },
    [GET_PLAY_LIST_BY_FAILURE]: (state, action) => {
      return produce(state, (draft) => {})
    },
  },
  INIT_STATE,
)

export default playListReducer
