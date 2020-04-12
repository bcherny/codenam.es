import React from 'react'
import logo from './logo.svg'
import './App.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './containers/HomePage'

export default function App() {
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
