import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Noticia eliminada' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error eliminando noticia' }, { status: 500 });
  }
}
