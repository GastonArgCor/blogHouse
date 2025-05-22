// app/api/news/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ message: "Noticia eliminada" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting news" }, { status: 500 });
  }
}
