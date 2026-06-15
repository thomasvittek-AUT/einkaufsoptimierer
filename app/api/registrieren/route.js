import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Alle Felder ausfüllen." }, { status: 400 });
  }

  const existiert = await prisma.user.findUnique({ where: { email } });
  if (existiert) {
    return NextResponse.json({ error: "E-Mail bereits registriert." }, { status: 400 });
  }

  const gehasht = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email, password: gehasht } });

  return NextResponse.json({ success: true });
}
