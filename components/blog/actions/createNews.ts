import { prisma } from "@/lib/prisma";

export const createNews = async (title: string, content: string, imageUrl: string) => {
  try {
    await prisma.news.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });
  } catch (error) {
    console.error("Error creando noticia:", error);
    throw error;
  }
};
