import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

// Esta es la forma correcta para App Router
export async function DELETE(
  req: NextRequest,
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
