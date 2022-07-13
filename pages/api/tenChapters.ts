import type { NextApiRequest, NextApiResponse } from 'next'
import { getLastTenChapters } from './../../db/chapters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json({
    chapters: await getLastTenChapters(),
  })
}
