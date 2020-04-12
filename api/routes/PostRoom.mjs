import prisma from '../services/Prisma.mjs'
import {generateRandomSha1} from '../utils/hash.mjs'

export default async function (req, res) {
  const room = await prisma.room.create({
    data: {
      room_id: generateRandomSha1(),
      state: 'NOT_STARTED',
    },
  })
  res.send(room)
}
