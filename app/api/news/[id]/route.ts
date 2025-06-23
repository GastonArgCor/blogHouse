// app/api/news/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Next.js espera que el segundo argumento sea `params`, no `context`
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.news.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Noticia eliminada" });
  } catch (error) {
    return NextResponse.json({ error: "Error eliminando noticia" }, { status: 500 });
  }
}
