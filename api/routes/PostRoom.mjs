import prisma from '../services/Prisma.mjs'
import {generateRandomSha1} from '../utils/hash.mjs'

export default async function (req, res) {
  const sha1 = generateRandomSha1()
  const room = await prisma.room.create({
    data: {
      room_id: sha1,
      short_id: sha1.slice(0, 7),
      state: 'NOT_STARTED',
    },
  })
  res.send({
    id: room.short_id,
    state: room.state,
    time_created: room.time_created,
    users: [],
  })
}
