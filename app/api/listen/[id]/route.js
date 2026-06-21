import { prisma } from "../../../../lib/prisma.js";
import { auth } from "../../../../auth.js";
import { NextResponse } from "next/server";

// Holt eine einzelne Liste samt Produkten
export async function GET(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { id } = await params;
  const listeId = Number(id);
  if (!Number.isInteger(listeId)) {
    return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
  }

  const liste = await prisma.einkaufsliste.findUnique({
    where: { id: listeId },
    include: { produkte: { orderBy: { id: "asc" } } },
  });

  if (!liste || liste.userId !== Number(session.user.id)) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json(liste);
}

// Löscht eine Einkaufsliste (samt ihrer Produkte)
export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { id } = await params;
  const listeId = Number(id);
  if (!Number.isInteger(listeId)) {
    return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
  }

  // Sicherheitsprüfung: Gehört die Liste diesem Benutzer?
  const liste = await prisma.einkaufsliste.findUnique({ where: { id: listeId } });
  if (!liste || liste.userId !== Number(session.user.id)) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  // Erst Produkte löschen, dann die Liste selbst
  await prisma.produkt.deleteMany({ where: { einkaufslisteId: listeId } });
  await prisma.einkaufsliste.delete({ where: { id: listeId } });

  return NextResponse.json({ success: true });
}
