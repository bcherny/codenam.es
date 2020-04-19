import prisma from '../services/Prisma.mjs'
import {generateRandomSha1} from '../utils/hash.mjs'

export default async function (req, res) {
  const sha1 = generateRandomSha1()
  const user = await prisma.user.create({
    data: {
      name: null,
      pic: '👶',
      short_id: sha1.slice(0, 7),
      user_id: sha1,
    },
  })
  // change
  res.send({
    id: user.short_id,
    name: user.name,
    pic: user.pic,
  })
}
