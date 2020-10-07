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

const [
  GET_MEDIA_BY_PLAYLIST_ID,
  GET_MEDIA_BY_PLAYLIST_ID_SUCCESS,
  GET_MEDIA_BY_PLAYLIST_ID_FAILURE,
] = makeActionTypes(`${PREFIX}/GET_MEDIA_BY_PLAYLIST_ID`)

const ACTIVE_ALBUM = `${PREFIX}/ACTIVE_ALBUM`

// Action Creator
export const getPlayListBy = createRequestThunk(
  GET_PLAY_LIST_BY,
  api.getPlayListBy,
)
export const getMediaByPlayListId = createRequestThunk(
  GET_MEDIA_BY_PLAYLIST_ID,
  api.getMediaByPlayListId,
)

export const activeAlbum = createAction(ACTIVE_ALBUM, (action) => action)

const INIT_STATE = {
  list: [], // playlist
  album: null, // active album
  mediaList: [], // active album of media files
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
    [ACTIVE_ALBUM]: (state, { payload: album }) => {
      // console.log({ album })
      return produce(state, (draft) => {
        draft.album = album
      })
    },
    [GET_MEDIA_BY_PLAYLIST_ID_SUCCESS]: (state, { payload }) => {
      console.log({ payload })
      return produce(state, (draft) => {
        if (!draft.album) draft.album = payload.album

        draft.mediaList = payload.mediaList
      })
    },
    [GET_MEDIA_BY_PLAYLIST_ID_FAILURE]: (state, action) => {
      return produce(state, (draft) => {})
    },
  },
  INIT_STATE,
)

export default playListReducer
