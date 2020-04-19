import React from 'react'
import './App.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './containers/HomePage.jsx'
import axios from 'axios'

export default function App() {
  React.useEffect(() => {
    handleUserId()
  }, [])

  async function handleUserId() {
    const ls = localStorage
    const storedUserId = ls.getItem('userId')

    if (Number(storedUserId) === NaN) {
      const newUserId = await axios.post('http://localhost:8000/api/user').id
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
