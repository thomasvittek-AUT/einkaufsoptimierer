"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

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
          <p className="text-gray-600">Willkommen, <strong>{session?.user?.name}</strong>!</p>
          <p className="text-gray-400 text-sm mt-2">Hier werden deine Einkaufslisten erscheinen.</p>
        </div>
      </div>
    </div>
  );
}
