import { combineReducers } from 'redux';
import loading from './loading';
import auth from './auth';
import { all } from 'redux-saga/effects';
import sampleReducer, { sagaSampleHandler } from './sample'

const rootReducer = combineReducers({
  loading,
  auth,
  sample: sampleReducer,
});

export function* rootSaga() {
  yield all([sagaSampleHandler()]);
}

export default rootReducer;
