"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginSeite() {
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [fehler, setFehler] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setFehler("");

    const ergebnis = await signIn("credentials", {
      email,
      password: passwort,
      redirect: false,
    });

    if (ergebnis?.error) {
      setFehler("E-Mail oder Passwort falsch.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">🛒 Anmelden</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            />
          </div>

          {fehler && <p className="text-red-500 text-sm">{fehler}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition"
          >
            Anmelden
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Noch kein Konto?{" "}
          <a href="/registrieren" className="text-green-600 font-medium hover:underline">
            Jetzt registrieren
          </a>
        </p>
      </div>
    </div>
  );
}
