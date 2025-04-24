"use server";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllNews() {
  return await prisma.news.findMany({
    orderBy: { createdAt: 'desc' }
  });
}
