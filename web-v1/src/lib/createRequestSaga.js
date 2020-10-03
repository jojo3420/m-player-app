import { put, call } from 'redux-saga/effects'

/**
 * 리덕스 사가 미들웨어 요청 생성함수
 * @param actionType: String
 * @param requestFn: Function
 * @return {function(...[*]=)}
 */
export default function createRequestSaga(actionType, requestFn) {
  return function* (action) {
    const SUCCESS = `${actionType}_SUCCESS`
    const FAILURE = `${actionType}_FAILURE`
    // yield put({ type: actionType });
    try {
      const response = yield call(requestFn, action.payload)
      yield put({ type: SUCCESS, payload: response.data })
    } catch (e) {
      // console.log({ e })
      yield put({ type: FAILURE, payload: e, error: true })
      throw e
    }
  }
}
