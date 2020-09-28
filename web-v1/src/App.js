import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PlayerPage from 'pages/PlayerPage'
import SignUpPage from 'pages/SignUpPage'
import LoginPage from 'pages/LoginPage'
import PageNotFound from 'pages/PageNotFound'
import PlayListPage from 'pages/PlayListPage'

function App() {
  return (
    <Switch>
      {/*path={['/', '/@:username']},   /posts/:id  */}
      <Route path="/" exact component={PlayListPage} />
      <Route path="/player" component={PlayerPage} />
      <Route path="/signin" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route component={PageNotFound} />
    </Switch>
  )
}

export default App
