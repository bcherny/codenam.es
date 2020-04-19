import test from 'ava'
import {post, startServer} from './TestUtils.mjs'

test('it should create a user', async t => {
  await startServer()
  const {id, name, pic} = await post('/api/user', {})
  t.true(typeof id === 'string')
  t.is(name, null)
  t.is(pic, '👶')
})
