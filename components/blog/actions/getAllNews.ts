import { prisma } from "@/lib/prisma";

export const getAllNews = async () => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return news.map(n => ({
      ...n,
      createdAt: n.createdAt.toISOString(), // Convertimos a string ISO para evitar Invalid Date
    }));
  } catch (error) {
    console.error("Error obteniendo noticias:", error);
    return [];
  }
};
