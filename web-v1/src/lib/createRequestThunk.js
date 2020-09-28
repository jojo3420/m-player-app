import { startLoading, endLoading } from 'modules/loading';
import makeActionTypes from 'lib/makeActionTypes';

/**
 * Create Request Thunk
 * @param type
 * @param request
 * @return {function(*=): function(...[*]=)}
 */
function createRequestThunk(type, request) {
  const [, SUCCESS, FAILURE] = makeActionTypes(type);
  return (params) => async (dispatch) => {
    try {
      dispatch({ type });
      dispatch(startLoading(type));
      const response = await request(params);
      dispatch({ type: SUCCESS, payload: response.data });
      dispatch(endLoading(type));
    } catch (e) {
      console.error({ e });
      dispatch({ type: FAILURE, e, error: true });
      dispatch(endLoading(type));
      throw e;
    }
  };
}

export default createRequestThunk;
