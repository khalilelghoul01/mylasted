import { prisma } from './client'

export const addUser = async (
  name: string,
  email: string,
  password: string,
) => {
  if (!email || !password) return null
  if (await userExists(email)) return null
  email = email.trim()
  const user = await prisma.user.create({
    data: {
      avatar: 'https://ui-avatars.com/api/?name=' + name,
      name: name,
      email: email,
      password: password,
    },
  })
  return user
}

export const userExists = async (email: string) => {
  email = email.trim()
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })
  return user
}

export const login = async (email: string, password: string) => {
  email = email.trim()
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  })
  return user
}
