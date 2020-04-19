import test from 'ava'
import {get, post, startServer} from './TestUtils.mjs'

test('it should get a room', async t => {
  await startServer()
  const {id, time_created} = await post('/api/room', {})
  const room = await get(`/api/room/${id}`)
  t.is(room.state, 'NOT_STARTED')
  t.is(room.id, id)
  t.is(room.time_created, time_created)
  t.deepEqual(room.users, [])
})
