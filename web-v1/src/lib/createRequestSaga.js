import { put, call } from 'redux-saga/effects';

export default function createRequestSaga(actionType, requestFn) {
	return function*(action) {
		const SUCCESS = `${actionType}_SUCCESS`;
		const FAILURE = `${actionType}_FAILURE`;
		// yield put({ type: actionType });
		try {
			const response = yield call(requestFn, action.payload);
			yield put({ type: SUCCESS, payload: response.data });
		} catch (e) {
			yield put({ type: FAILURE, payload: e, error: true });
			throw e;
		}
	};
}
