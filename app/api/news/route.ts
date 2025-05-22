// app/api/news/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const { title, content, imageUrl } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const newNews = await prisma.news.create({
    data: { title, content, imageUrl },
  });

  return NextResponse.json(newNews);
}
