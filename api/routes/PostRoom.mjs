import prisma from '../services/Prisma.mjs'
import {createHash} from 'crypto'

const SALT = 'nd6723fgy2ebdi7gbd'

export default async function (req, res) {
  const sha1 = createHash('sha1')
    .update(SALT + Math.random().toString())
    .digest('hex')
  const room = await prisma.room.create({
    data: {
      room_id: sha1,
      state: 'NOT_STARTED',
    },
  })
  res.send(room)
}
