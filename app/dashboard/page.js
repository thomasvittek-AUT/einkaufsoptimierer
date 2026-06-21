"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [listen, setListen] = useState([]);
  const [neuerName, setNeuerName] = useState("");
  const [laedt, setLaedt] = useState(true);

  // Listen vom Server laden
  async function ladeListen() {
    const antwort = await fetch("/api/listen");
    if (antwort.ok) {
      setListen(await antwort.json());
    }
    setLaedt(false);
  }

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") ladeListen();
  }, [status, router]);

  // Neue Liste erstellen
  async function erstelleListe(e) {
    e.preventDefault();
    if (!neuerName.trim()) return;

    const antwort = await fetch("/api/listen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: neuerName }),
    });

    if (antwort.ok) {
      setNeuerName("");
      ladeListen();
    }
  }

  // Liste löschen
  async function loescheListe(id) {
    if (!confirm("Diese Liste wirklich löschen?")) return;
    await fetch(`/api/listen/${id}`, { method: "DELETE" });
    ladeListen();
  }

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">🛒 Mein Einkaufsoptimierer</h1>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-gray-500 hover:text-red-500 transition"
            >
              Abmelden
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            Willkommen, <strong>{session?.user?.name}</strong>!
          </p>

          {/* Formular: neue Liste erstellen */}
          <form onSubmit={erstelleListe} className="flex gap-2 mb-6">
            <input
              type="text"
              value={neuerName}
              onChange={(e) => setNeuerName(e.target.value)}
              placeholder="Name der neuen Liste (z. B. Wocheneinkauf)"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="bg-green-600 text-white font-medium px-5 rounded-xl hover:bg-green-700 transition"
            >
              + Erstellen
            </button>
          </form>

          {/* Liste der Einkaufslisten */}
          {laedt ? (
            <p className="text-gray-400">Lade Listen...</p>
          ) : listen.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Noch keine Listen. Erstelle deine erste Einkaufsliste oben!
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {listen.map((liste) => (
                <li
                  key={liste.id}
                  className="flex justify-between items-center border border-gray-200 rounded-xl px-4 py-3 hover:bg-green-50 transition"
                >
                  <Link href={`/liste/${liste.id}`} className="flex-1">
                    <span className="font-medium text-gray-800">{liste.name}</span>
                    <span className="text-gray-400 text-sm ml-2">
                      ({liste.produkte.length} Produkte)
                    </span>
                  </Link>
                  <button
                    onClick={() => loescheListe(liste.id)}
                    className="text-gray-400 hover:text-red-500 transition ml-4"
                  >
                    Löschen
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
