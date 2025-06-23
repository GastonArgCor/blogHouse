import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop(); // extrae el ID desde la URL

    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Noticia eliminada' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error eliminando noticia' }, { status: 500 });
  }
}
