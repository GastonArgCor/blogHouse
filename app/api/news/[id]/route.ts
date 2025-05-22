import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getIdFromRequest(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) throw new Error("ID no especificado");
  return id;
}

export async function GET(request: Request) {
  try {
    const id = await getIdFromRequest(request);
    const newsItem = await prisma.news.findUnique({ where: { id } });
    if (!newsItem) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 });
    }
    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = await getIdFromRequest(request);
    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ message: "Noticia eliminada" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const id = await getIdFromRequest(request);
    const { title, content, imageUrl } = await request.json();

    if (!title && !content && !imageUrl) {
      return NextResponse.json({ error: "No hay datos para actualizar" }, { status: 400 });
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: { title, content, imageUrl },
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
