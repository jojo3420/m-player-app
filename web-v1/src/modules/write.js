import { createAction, handleActions } from 'redux-actions';
import makeActionTypes from 'lib/makeActionTypes';

const PREFIX = 'write';
const INITIALIZE = `${PREFIX}/INITIALIZE`;
const CHANGE_FIELD = `${PREFIX}/CHANGE_FIELD`;

// Action Creator
export const initialize = () => ({ type: INITIALIZE });
export const changeField = createAction(CHANGE_FIELD, (input) => input);
