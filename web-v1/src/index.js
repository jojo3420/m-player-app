import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'modules/store'
// import { onCheckLogin, tempSetUser } from 'modules/auth';
// import * as serviceWorker from './serviceWorker';

// first start or refresh app run!
// function loadAuthByLocalStorage() {
//   try {
//     const user = localStorage.getItem('user');
//     if (!user) return;
//     store.dispatch(tempSetUser(JSON.parse(user)));
//     store.dispatch(onCheckLogin());
//   } catch (e) {
//     console.log('loadAuthByLocalStorage is not working!' + e);
//   }
// }
// loadAuthByLocalStorage();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store()}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
