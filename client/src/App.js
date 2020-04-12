import React from 'react'
import './App.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './containers/HomePage'
import axios from 'axios'

export default function App() {
  React.useEffect(() => {
    handleFetchUser()
  }, [])

  const ls = localStorage

  function handleFetchUser() {
    const storedUser = ls.getItem('user')

    if(storedUser === '' ||storedUser===undefined)
  }

  return (
    <Router>
      <Switch>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Switch>
    </Router>
  )
}
