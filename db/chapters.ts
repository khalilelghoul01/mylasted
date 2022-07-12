import { prisma } from './client'

export const getAllChapters = async () => {
  const chapters = await prisma.chapter.findMany()
  return chapters
}

export const getChapterBySlug = async (slug: string) => {
  const chapter = await prisma.chapter.findFirst({
    where: {
      slug,
    },
  })
  return chapter
}
