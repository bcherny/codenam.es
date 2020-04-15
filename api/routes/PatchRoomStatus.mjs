import prisma from '../services/Prisma.mjs'
import {generateRandomSha1} from '../utils/hash.mjs'

export default async function (
  {body: {state}, params: {room_id, user_id}},
  res
) {
  if (state !== 'READY' && state !== 'NOT_READY') {
    throw RangeError(
      `Expected the request body to look like {state: "READY"} or {state: "NOT_READY}", but got "${state}"`
    )
  }
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
  const userXRoom = await prisma.user_x_room.findMany({
    where: {
      room_id: room.id,
      user_id: user.id,
    },
  })
  await prisma.user_x_room.update({
    data: {state},
    where: {
      id: userXRoom[0].id,
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

  const roomStatus = roomUsers.every(_ => _.state === 'READY')
    ? 'IN_PROGRESS'
    : 'NOT_STARTED'
  await prisma.room.update({
    data: {
      state: roomStatus,
    },
    where: {
      id: room.id,
    },
  })

  res.send({
    id: room.short_id,
    state: room.state,
    time_created: room.time_created,
    users: roomUsers.map(_ => _.user.short_id),
  })
}
