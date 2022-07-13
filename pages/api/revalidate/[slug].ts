import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllChapters } from '../../../db/chapters'
import { server } from './../../../config/index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query
  await res.revalidate(server + `/chapter/${slug}`)
  res.status(200).json({
    slug,
  })
}
