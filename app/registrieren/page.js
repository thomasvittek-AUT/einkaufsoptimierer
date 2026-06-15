"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrierenSeite() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [fehler, setFehler] = useState("");
  const [erfolg, setErfolg] = useState(false);
  const router = useRouter();

  async function handleRegistrieren(e) {
    e.preventDefault();
    setFehler("");

    const antwort = await fetch("/api/registrieren", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password: passwort }),
    });

    const daten = await antwort.json();

    if (!antwort.ok) {
      setFehler(daten.error);
    } else {
      setErfolg(true);
      setTimeout(() => router.push("/login"), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">🛒 Registrieren</h1>

        {erfolg ? (
          <p className="text-green-600 text-center font-medium">
            ✅ Konto erstellt! Du wirst weitergeleitet...
          </p>
        ) : (
          <form onSubmit={handleRegistrieren} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Max Mustermann"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="deine@email.at"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
              <input
                type="password"
                value={passwort}
                onChange={(e) => setPasswort(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {fehler && <p className="text-red-500 text-sm">{fehler}</p>}

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition"
            >
              Konto erstellen
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Bereits registriert?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Anmelden
          </a>
        </p>
      </div>
    </div>
  );
}
