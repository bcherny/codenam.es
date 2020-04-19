import test from 'ava'
import {post, startServer} from './TestUtils.mjs'

test('it should create a room', async t => {
  await startServer()
  const {id, state, time_created, users} = await post('/api/room', {})
  t.is(state, 'NOT_STARTED')
  t.true(typeof id === 'string')
  t.true(typeof time_created === 'string')
  t.deepEqual(users, [])
})
