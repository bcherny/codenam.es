import express from 'express'
import GetUser from './routes/GetUser.mjs'
import GetRoom from './routes/GetRoom.mjs'
import PatchRoomJoin from './routes/PatchRoomJoin.mjs'
import PatchUser from './routes/PatchUser.mjs'
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
      .patch('/api/user/:id', PatchUser)
      .post('/api/room', PostRoom)
      .post('/api/user', PostUser)

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
