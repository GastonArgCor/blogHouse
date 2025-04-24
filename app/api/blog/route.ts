import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const blogs = await prisma.blog.findMany();  // Usa "blogs" en vez de "posts"
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description } = body;

  if (!title || !description) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const newBlog = await prisma.blog.create({
    data: { title, description },
  });

  return NextResponse.json(newBlog, { status: 201 });
}
