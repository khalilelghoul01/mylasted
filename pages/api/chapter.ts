// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllChapters, getChapterBySlug } from '../../db/chapters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const body = req.body
  const slugString = body.slug as string
  res.status(200).json({
    chapter: await getChapterBySlug(slugString),
  })
}
