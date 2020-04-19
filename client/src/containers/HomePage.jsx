import * as React from 'react'
import './HomePage.css'
import axios from 'axios'
import EditUser from '../components/editUser'
import Hero from '../components/hero'

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <EditUser />
    </div>
  )
}
