import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const posts = await prisma.blog.findMany();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, description } = req.body;
    const newPost = await prisma.blog.create({
      data: { title, description },
    });
    res.status(201).json(newPost);
  } else {
    res.status(405).end();
  }
}
