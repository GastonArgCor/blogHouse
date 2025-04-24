import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los posts
export async function GET(req: NextRequest) {
  const posts = await prisma.blog.findMany();
  return NextResponse.json(posts);
}

// Crear un nuevo post
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description } = body;

  if (!title || !description) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const newPost = await prisma.blog.create({
    data: { title, description },
  });

  return NextResponse.json(newPost, { status: 201 });
}
