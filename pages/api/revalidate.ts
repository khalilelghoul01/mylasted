import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllChapters } from '../../db/chapters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const chapters = await getAllChapters()
  for (const chapter of chapters) {
    await res.revalidate(`/chapter/${chapter.slug}`)
  }
  res.status(200).json({
    chapters,
  })
}
