import prisma from '../services/Prisma.mjs'

export default async function ({params: {id}}, res) {
  const user = await prisma.user.findOne({
    where: {
      short_id: id,
    },
  })
  res.send(user)
}
