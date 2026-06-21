import { prisma } from "../../../../lib/prisma.js";
import { auth } from "../../../../auth.js";
import { NextResponse } from "next/server";

// Löscht ein einzelnes Produkt
export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { id } = await params;
  const produktId = Number(id);
  if (!Number.isInteger(produktId)) {
    return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
  }

  // Produkt samt zugehöriger Liste laden, um den Besitzer zu prüfen
  const produkt = await prisma.produkt.findUnique({
    where: { id: produktId },
    include: { einkaufsliste: true },
  });
  if (!produkt || produkt.einkaufsliste.userId !== Number(session.user.id)) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  await prisma.produkt.delete({ where: { id: produktId } });

  return NextResponse.json({ success: true });
}
