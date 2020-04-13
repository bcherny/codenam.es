import prisma from '../services/Prisma.mjs'
import {generateRandomSha1} from '../utils/hash.mjs'

export default async function ({body, params: {id}}, res) {
  const user = await prisma.user.update({
    data: body,
    where: {
      short_id: id,
    },
  })
  res.send({
    id: user.short_id,
    name: user.name,
    pic: user.pic,
  })
}
