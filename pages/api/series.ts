import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const seriesId = req.query.seriesId;

    if (!seriesId) {
      return res.status(400).json({ error: 'Missing seriesId parameter' });
    }

    try {
      const episodes = await prisma.movie.findMany({
        where: {
          seriesId: seriesId as string,
        },
      });

      return res.status(200).json(episodes);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch episodes' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
