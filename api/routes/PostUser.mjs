import prisma from '../services/Prisma.mjs'
import {generateRandomSha1} from '../utils/hash.mjs'

export default async function (req, res) {
  const user = await prisma.user.create({
    data: {
      name: null,
      pic: '👶',
      user_id: generateRandomSha1(),
    },
  })
  res.send(user)
}
