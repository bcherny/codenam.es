import test from 'ava'
import {patch, post, startServer} from './TestUtils.mjs'

test('it should mark the room as IN_PROGRESS once everyone is ready', async t => {
  await startServer()
  const room = await post('/api/room', {})
  const user1 = await post('/api/user', {})
  const user2 = await post('/api/user', {})
  await patch(`/api/room/${room.id}/join/${user1.id}`, {})
  await patch(`/api/room/${room.id}/join/${user2.id}`, {})

  // User 1 is ready
  const roomAfterState1 = await patch(
    `/api/room/${room.id}/state/${user1.id}`,
    {state: 'READY'}
  )
  t.is(roomAfterState1.state, 'NOT_STARTED')

  // User 2 is ready
  const roomAfterState2 = await patch(
    `/api/room/${room.id}/state/${user2.id}`,
    {state: 'READY'}
  )
  t.is(roomAfterState2.state, 'IN_PROGRESS')
})
