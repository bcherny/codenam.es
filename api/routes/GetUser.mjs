import prisma from '../services/Prisma.mjs'

export default async function ({params: {user_id}}, res) {
  const user = await prisma.user.findOne({
    where: {
      user_id,
    },
  })
  res.send(user)
}
