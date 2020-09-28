import { handleActions, createAction } from 'redux-actions';
import * as api from 'lib/api/api';
import createRequestThunk from '../lib/createRequestThunk';
import createRequestSaga from '../lib/createRequestSaga';
import { takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import produce from 'immer';

// Action Type
const SAMPLE = 'sample/SAMPLE';
const SAMPLE_SUCCESS = 'sample/SAMPLE_SUCCESS';
const SAMPLE_FAILED = 'sample/SAMPLE_FAILED';

const SAMPLE_SAGA = 'sample/SAMPLE_SAGA';
const SAMPLE_SAGA_SUCCESS = 'sample/SAMPLE_SAGA_SUCCESS';

// Action Creator Function
export const sample = createRequestThunk(SAMPLE, api.sample);
export const sampleSaga = createAction(SAMPLE_SAGA, () => null);

const requSampleSaga = createRequestSaga(SAMPLE_SAGA, api.sample);

export function* sagaSampleHandler() {
	yield takeLatest(SAMPLE_SAGA, requSampleSaga);
}

const INITIAL_STATE = {
	sample: 0,
	list: [],
};

const sampleReducer = handleActions(
	{
		[SAMPLE_SUCCESS]: (state, { payload }) => {
			return produce(state, draft => {
				draft.list = payload['KeyStatisticList'].row;
			});
		},
		[SAMPLE_SAGA_SUCCESS]: (state, { payload }) => {
			debugger;
			return produce(state, draft => {
				draft.list = payload['KeyStatisticList'].row;
			});
		},
	},
	INITIAL_STATE,
);

export default sampleReducer;
