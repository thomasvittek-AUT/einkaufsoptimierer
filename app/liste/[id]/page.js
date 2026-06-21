"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function ListenAnsicht() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const listeId = params.id;

  const [liste, setListe] = useState(null);
  const [laedt, setLaedt] = useState(true);

  // Eingabefelder für ein neues Produkt
  const [name, setName] = useState("");
  const [menge, setMenge] = useState("");
  const [einheit, setEinheit] = useState("");

  // Liste samt Produkten laden
  async function ladeListe() {
    const antwort = await fetch(`/api/listen/${listeId}`);
    if (antwort.ok) {
      setListe(await antwort.json());
    } else {
      setListe(null);
    }
    setLaedt(false);
  }

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") ladeListe();
    // listeId muss dabei sein, sonst lädt die Seite beim Wechsel zwischen
    // zwei Listen die Daten nicht neu.
  }, [status, router, listeId]);

  // Produkt hinzufügen
  async function fuegeProduktHinzu(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const antwort = await fetch("/api/produkte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ einkaufslisteId: listeId, name, menge, einheit }),
    });

    if (antwort.ok) {
      setName("");
      setMenge("");
      setEinheit("");
      ladeListe();
    }
  }

  // Produkt löschen
  async function loescheProdukt(id) {
    await fetch(`/api/produkte/${id}`, { method: "DELETE" });
    ladeListe();
  }

  if (status === "loading" || laedt) {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  }

  if (!liste) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Liste nicht gefunden.</p>
        <Link href="/dashboard" className="text-green-600 hover:underline">
          Zurück zum Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <Link href="/dashboard" className="text-sm text-green-600 hover:underline">
            ← Zurück
          </Link>
          <h1 className="text-2xl font-bold text-green-700 mt-2 mb-6">{liste.name}</h1>

          {/* Formular: Produkt hinzufügen */}
          <form onSubmit={fuegeProduktHinzu} className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Produkt (z. B. Milch)"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              value={menge}
              onChange={(e) => setMenge(e.target.value)}
              placeholder="Menge"
              className="w-full sm:w-20 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              value={einheit}
              onChange={(e) => setEinheit(e.target.value)}
              placeholder="Einheit"
              className="w-full sm:w-24 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="bg-green-600 text-white font-medium px-5 py-2 rounded-xl hover:bg-green-700 transition"
            >
              +
            </button>
          </form>

          {/* Produktliste */}
          {liste.produkte.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Noch keine Produkte. Füge oben das erste hinzu!
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {liste.produkte.map((produkt) => (
                <li
                  key={produkt.id}
                  className="flex justify-between items-center border border-gray-200 rounded-xl px-4 py-3"
                >
                  <span className="text-gray-800">
                    {produkt.menge && <strong>{produkt.menge} </strong>}
                    {produkt.einheit && <span>{produkt.einheit} </span>}
                    {produkt.name}
                  </span>
                  <button
                    onClick={() => loescheProdukt(produkt.id)}
                    className="text-gray-400 hover:text-red-500 transition ml-4"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
