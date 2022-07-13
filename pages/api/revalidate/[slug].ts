import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllChapters } from '../../../db/chapters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query
  await res.revalidate(`/chapter/${slug}`)
  res.status(200).json({
    slug,
  })
}
