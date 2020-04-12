import React from 'react'
import './App.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './containers/HomePage.jsx'
import axios from 'axios'

export default function App() {
  React.useEffect(() => {
    handleFetchUser()
  }, [])

  const ls = localStorage

  function handleFetchUser() {
    const storedUser = ls.getItem('user')

    // Creates user
    if (storedUser === '' || storedUser === undefined) {
      const user = axios.post('http://localhost:8000/api/user')

      ls.setItem(user)
    } else {
      const user = axios.get('http://localhost:8000/api/user/' + storedUser)
    }
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
