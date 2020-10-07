import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PlayerPage from 'pages/PlayerPage'
import SignUpPage from 'pages/SignUpPage'
import SignInPage from 'pages/SignInPage'
import PageNotFound from 'pages/PageNotFound'
import PlayListPage from 'pages/PlayListPage'
import AlbumPage from 'pages/AlbumPage'
import HomePage from 'pages/HomePage'
import 'antd/dist/antd.css'

function App() {
  return (
    <Switch>
      {/*path={['/', '/@:username']},   /posts/:id  */}
      <Route path="/" exact component={HomePage} />
      <Route path="/playlist" exact component={PlayListPage} />
      <Route path="/player" component={PlayerPage} />
      <Route path="/playlist/:id" exact component={AlbumPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route component={PageNotFound} />
    </Switch>
  )
}

export default App
