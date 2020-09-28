import { useState, useCallback } from 'react';

/**
 *
 * @param initialState
 * @param deps
 * @return {unknown[]}
 */
function useFields(initialState, deps) {
  const [state, setState] = useState(initialState);

  const onChange = useCallback(
    (e) => {
      console.log({ e });
      if (e) {
        const { name, value } = e;
        console.log({ name, value });
        setState({ [name]: value });
      }
    },
    deps ? [...deps, setState] : [setState],
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return [state, onChange, reset];
}

export default useFields;
