import prisma from '../services/Prisma.mjs'

export default async function ({params: {id}}, res) {
  const room = await prisma.room.findOne({
    where: {
      short_id: id,
    },
  })

  if (!room) {
    throw ReferenceError(`There's no room with id "${id}"`)
  }

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
    users: (roomUsers || []).map(_ => _.user.short_id),
  })
}
