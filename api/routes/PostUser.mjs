import prisma from '../services/Prisma.mjs'

export default async function (req, res) {
  const user = await prisma.user.create({
    data: {
      name: null,
      pic: '👶',
    },
  })
  res.send(user)
}
