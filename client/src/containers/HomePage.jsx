import * as React from 'react'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <h1 className="title">CodeNames</h1>
      <div className="buttons-container">
        <button className="create-room">Create Room</button>
        <button className="join-room">Join Room</button>
      </div>
    </div>
  )
}
