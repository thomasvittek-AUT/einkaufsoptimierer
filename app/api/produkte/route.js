import { prisma } from "../../../lib/prisma.js";
import { auth } from "../../../auth.js";
import { NextResponse } from "next/server";

// Fügt ein Produkt zu einer Einkaufsliste hinzu
export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { einkaufslisteId, name, menge, einheit } = await request.json();
  if (!einkaufslisteId || !name) {
    return NextResponse.json({ error: "Liste oder Name fehlt." }, { status: 400 });
  }

  const listeId = Number(einkaufslisteId);
  if (!Number.isInteger(listeId)) {
    return NextResponse.json({ error: "Ungültige Listen-ID." }, { status: 400 });
  }

  // Sicherheitsprüfung: Gehört die Liste diesem Benutzer?
  const liste = await prisma.einkaufsliste.findUnique({
    where: { id: listeId },
  });
  if (!liste || liste.userId !== Number(session.user.id)) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  const produkt = await prisma.produkt.create({
    data: {
      name,
      menge: menge || null,
      einheit: einheit || null,
      einkaufslisteId: listeId,
    },
  });

  return NextResponse.json(produkt);
}
