import prisma from '../services/Prisma.mjs'
import {generateRandomSha1} from '../utils/hash.mjs'

export default async function ({params: {room_id, user_id}}, res) {
  const room = await prisma.room.findOne({
    where: {
      short_id: room_id,
    },
  })
  const user = await prisma.user.findOne({
    where: {
      short_id: user_id,
    },
  })
  await prisma.user_x_room.create({
    data: {
      room: {connect: {id: room.id}},
      state: 'NOT_READY',
      user: {connect: {id: user.id}},
    },
  })
  const roomUsers = await prisma.user_x_room.findMany({
    include: {
      user: {
        select: {short_id: true},
      },
    },
    where: {
      room_id: room.id,
    },
  })
  res.send({
    id: room.short_id,
    state: room.state,
    time_created: room.time_created,
    users: roomUsers.map(_ => _.user.short_id),
  })
}
