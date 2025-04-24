"use server";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createNews(title: string, content: string) {
  return await prisma.news.create({
    data: { title, content }
  });
}
