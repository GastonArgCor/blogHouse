import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
  }

  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: 'unknown',
    },
  });

  return NextResponse.json(user);
}
