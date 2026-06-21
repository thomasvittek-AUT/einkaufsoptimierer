import { prisma } from "../../../lib/prisma.js";
import { auth } from "../../../auth.js";
import { NextResponse } from "next/server";

// Holt alle Einkaufslisten des angemeldeten Benutzers
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  const userId = Number(session.user.id); // NextAuth liefert die ID als Text

  const listen = await prisma.einkaufsliste.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { produkte: true },
  });

  return NextResponse.json(listen);
}

// Erstellt eine neue Einkaufsliste
export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const userId = Number(session.user.id); // NextAuth liefert die ID als Text

  const { name } = await request.json();
  if (!name) {
    return NextResponse.json({ error: "Name fehlt." }, { status: 400 });
  }

  const liste = await prisma.einkaufsliste.create({
    data: { name, userId },
  });

  return NextResponse.json(liste);
}
