import { combineReducers } from 'redux'
import loading from './loading'
import auth, { authSaga } from './auth'
import playList from './playlist'
import { all } from 'redux-saga/effects'
import sampleReducer, { sagaSampleHandler } from './sample'

const rootReducer = combineReducers({
  loading,
  auth,
  playList,
  sample: sampleReducer,
})

export function* rootSaga() {
  yield all([sagaSampleHandler(), authSaga()])
}

export default rootReducer
