"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm">Hola, {session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
