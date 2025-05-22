import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  params: { id: string };
};

export default async function NewsPage({ params }: Props) {
  const news = await prisma.news.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  if (!news) return <p>Noticia no encontrada</p>;

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-500 mb-4">
        {format(new Date(news.createdAt), "dd 'de' MMMM yyyy, HH:mm", { locale: es })}
      </p>
      {news.imageUrl && <img src={news.imageUrl} alt={news.title} className="mb-4 max-w-full" />}
      <p>{news.content}</p>
    </main>
  );
}
