export default function Home() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-2">🛒 Einkaufsoptimierer</h1>
        <p className="text-gray-500 mb-8">Finde die günstigste Option für deinen Einkauf.</p>

        <a
          href="/login"
          className="block w-full bg-green-600 text-white text-lg font-medium py-3 rounded-xl hover:bg-green-700 transition mb-3"
        >
          Anmelden
        </a>
        <a
          href="/registrieren"
          className="block w-full border border-green-600 text-green-700 text-lg font-medium py-3 rounded-xl hover:bg-green-50 transition"
        >
          Neu registrieren
        </a>
      </div>
    </div>
  );
}
