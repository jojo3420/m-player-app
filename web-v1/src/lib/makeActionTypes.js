function makeActionTypes (type) {
  const SUCCESS = `${type}_SUCCESS`
  const FAILURE = `${type}_FAILURE`;
  return [
    type,
    SUCCESS,
    FAILURE,
  ]
}

export default makeActionTypes;
