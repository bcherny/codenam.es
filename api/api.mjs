import express from 'express'
import GetUser from './routes/GetUser.mjs'
import GetRoom from './routes/GetRoom.mjs'
import PatchRoomJoin from './routes/PatchRoomJoin.mjs'
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

      // API Endpoints
      .get('/api/room/:id', GetRoom)
      .get('/api/user/:id', GetUser)
      .patch('/api/room/:room_id/join/:user_id', PatchRoomJoin)
      .post('/api/room', PostRoom)
      .post('/api/user', PostUser)

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
