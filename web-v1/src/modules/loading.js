
// Action
const PREFIX = 'loading';
const START_LOADING = `${PREFIX}/START_LOADING`;
const END_LOADING = `${PREFIX}/END_LOADING`;



// Action Creator
export const startLoading = actionType => ({ type: START_LOADING, actionType });
export const endLoading = actionType => ({ type: END_LOADING, actionType });


// initial state
const initialState = {};


const loading = (state = initialState, action) => {
  const { type, actionType } = action;
  switch (type) {
    case START_LOADING:
      return { ...state, [actionType]: true };
    case END_LOADING:
      return { ...state, [actionType]: false };
    default:
      return state;
  }
};

export default loading;

