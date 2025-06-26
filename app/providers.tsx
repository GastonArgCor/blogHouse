"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark" {...themeProps}>
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}

// app/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NewsManager from "@/components/blog/components/NewsManager";
import { News } from "@/components/blog/interfaces/News";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const newsFromDb = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  const news: News[] = newsFromDb.map((n) => ({
    ...n,
    createdAt: n.createdAt.toISOString(),
  }));

  return (
    <main className="bg-black min-h-screen p-6 text-white max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Noticias</h1>
      <NewsManager initialNews={news} />
    </main>
  );
}