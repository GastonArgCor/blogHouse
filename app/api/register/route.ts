import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son obligatorios' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Usuario ya registrado' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    return NextResponse.json({
      message: 'Usuario creado correctamente',
      user: { id: user.id, email: user.email, name: user.name },
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
