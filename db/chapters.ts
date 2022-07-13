import { prisma } from './client'

export const getAllChapters = async () => {
  const chapters = await prisma.chapter.findMany()
  return chapters
}

export const getChapterBySlug = async (slug: string) => {
  const chapter = await prisma.chapter.findFirst({
    where: {
      slug: slug,
    },
  })
  return chapter
}

export const addChapter = async (title: string, content: string) => {
  const newTitle = 'Return of The Mount Hua – ' + title.trim()
  const chapter = await prisma.chapter.create({
    data: {
      title: newTitle,
      content,
      slug: title
        .trim()
        .toLowerCase()
        .replace(/(\s|\.|\?|_|\\|\/|\||\(|\))+/g, '-'),
      translator: {
        connect: {
          id: 1,
        },
      },
    },
  })
  return chapter
}

export const updateChapter = async (
  slug: string,
  title: string,
  content: string,
) => {
  const chapter = await prisma.chapter.update({
    where: {
      slug,
    },
    data: {
      title,
      content,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      updatedAt: new Date(),
    },
  })
  return chapter
}

export const deleteChapter = async (slug: string) => {
  const chapter = await prisma.chapter.delete({
    where: {
      slug,
    },
  })
  return chapter
}

export const getLastTenChapters = async () => {
  const chapters = await prisma.chapter.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 10,
  })
  return chapters
}
