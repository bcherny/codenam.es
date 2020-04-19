import test from 'ava'
import {patch, post, startServer} from './TestUtils.mjs'

test('it should join a room', async t => {
  await startServer()
  const room = await post('/api/room', {})

  // User 1 joins
  const user1 = await post('/api/user', {})
  const roomAfterJoin1 = await patch(
    `/api/room/${room.id}/join/${user1.id}`,
    {}
  )
  t.is(roomAfterJoin1.state, 'NOT_STARTED')
  t.deepEqual(roomAfterJoin1.users, [user1.id])

  // User 2 joins
  const user2 = await post('/api/user', {})
  const roomAfterJoin2 = await patch(
    `/api/room/${room.id}/join/${user2.id}`,
    {}
  )
  t.is(roomAfterJoin2.state, 'NOT_STARTED')
  t.deepEqual(roomAfterJoin2.users, [user1.id, user2.id])
})
