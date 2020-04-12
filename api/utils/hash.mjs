import {createHash} from 'crypto'

const SALT = 'nd6723fgy2ebdi7gbd'

export function generateRandomSha1() {
  return createHash('sha1')
    .update(SALT + Math.random().toString())
    .digest('hex')
}
