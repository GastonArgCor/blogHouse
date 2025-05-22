import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ message: "Noticia eliminada" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar la noticia" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar la noticia" }, { status: 500 });
  }
}
