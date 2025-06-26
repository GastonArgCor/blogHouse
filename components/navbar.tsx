"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black text-white py-3 px-6 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        Noticias
      </Link>

      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">{session.user?.email}</span>
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Ingresar
        </Link>
      )}
    </nav>
  );
}
