import { prisma } from "@/lib/prisma";

export const getNewsById = async (id: string) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id },
    });
    if (!news) return null;

    return {
      ...news,
      createdAt: news.createdAt.toISOString(), // Para evitar invalid date en frontend
    };
  } catch (error) {
    console.error("Error obteniendo noticia:", error);
    return null;
  }
};
