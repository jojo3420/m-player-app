import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk';
import rootReducer, { rootSaga } from 'modules/index';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [ReduxThunk, sagaMiddleware];


const store = preloadedState => {
  const instance = createStore(rootReducer, preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  return instance;
}


export default store;
