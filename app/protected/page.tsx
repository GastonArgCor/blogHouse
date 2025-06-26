// app/protected/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NewsManager from "@/components/blog/components/NewsManager";
import { News } from "@/components/blog/interfaces/News";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

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
