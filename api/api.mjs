import express from 'express'
import PostRoom from './routes/PostRoom.mjs'
import PostUser from './routes/PostUser.mjs'
import cors from 'cors'

export function init() {
  return (
    express()
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({extended: true}))

      // Serve the client
      .use(express.static('./client/build'))

      // Create a new user
      .post('/api/user', PostUser)

      // Create a new room
      .post('/api/room', PostRoom)

      // Get a person
      .get('/api/user/:user_id', ({params: {user_id}}, res) => {
        res.send({
          id: user_id,
          name: 'Fake Person',
          pic: '😵',
        })
      })

      // Get a room
      .get('/api/room/:room_id', ({params: {room_id}}, res) => {
        res.send({
          id: 1,
          room_id,
          state: 'NOT_STARTED',
          users: [2],
        })
      })

      // Change a person's name
      .patch(
        '/api/user/:user_id/name',
        ({body: {name}, params: {user_id}}, res) => {
          res.send({
            id: user_id,
            name,
            pic: '😵',
          })
        }
      )

      // Change a person's emoji
      .patch(
        '/api/user/:user_id/pic',
        ({body: {pic}, params: {user_id}}, res) => {
          res.send({
            id: user_id,
            name: 'Fake Person',
            pic,
          })
        }
      )

      // Join a room
      .patch(
        '/api/room/:room_id/join/:user_id',
        ({params: {room_id, user_id}}, res) => {
          res.send({
            id: 1,
            room_id,
            state: 'NOT_STARTED',
            users: [user_id],
          })
        }
      )

      // Signal that you're ready
      .patch(
        '/api/room/:room_id/ready/:user_id',
        ({params: {room_id, user_id}}, res) => {
          res.send({
            id: 1,
            room_id,
            state: 'IN_PROGRESS',
            users: [user_id],
          })
        }
      )
  )
}
