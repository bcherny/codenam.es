import * as React from 'react'
import './HomePage.css'

export default function HomePage() {
  const [showJoinRoom, setShowJoinRoom] = React.useState(false)

  return (
    <div className="home-page">
      <h1 className="title">CodeNames</h1>
      <div className="buttons-container">
        <button className="create-room">Create Room</button>
        {showJoinRoom === false ? (
          <button
            className="join-room"
            onClick={() => {
              setShowJoinRoom(true)
            }}
          >
            Join Room
          </button>
        ) : (
          <input
            type="text"
            className="join-room-input"
            placeholder="Room Code:"
          />
        )}
      </div>
    </div>
  )
}
