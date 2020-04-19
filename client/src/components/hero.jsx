import * as React from 'react'
import './hero.css'

export default function Hero() {
  const [showJoinRoom, setShowJoinRoom] = React.useState(false)

  return (
    <div className="container hero">
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
