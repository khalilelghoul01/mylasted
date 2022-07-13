// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addChapter } from '../../db/chapters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const content = req.body.content
  const title = req.body.title
  res.status(200).json({
    chapter: await addChapter(title, content),
  })
}
