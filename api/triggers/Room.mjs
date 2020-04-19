import prisma from '../services/Prisma.mjs'

export async function runTriggers(roomID) {
  await updateRoomStatusWhenUserStatusesChange(roomID)
  await initGameboardWhenAllUsersAreReady(roomID)
}

async function initGameboardWhenAllUsersAreReady(roomID) {}

async function updateRoomStatusWhenUserStatusesChange(roomID) {
  const roomUsers = await prisma.user_x_room.findMany({
    include: {
      user: {
        select: {short_id: true},
      },
    },
    where: {
      room_id: roomID,
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
      id: roomID,
    },
  })
}
