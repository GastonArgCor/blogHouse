"use client";

import { useState } from "react";
import { News } from "../interfaces/News";
import NewsItem from "./NewsItem";

interface Props {
  initialNews: News[];
}

export default function NewsListClient({ initialNews }: Props) {
  const [newsList, setNewsList] = useState<News[]>(initialNews);

  // Recargar noticias desde la API (se usa tras borrar o actualizar)
  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Error al cargar noticias");
      const data: News[] = await res.json();
      setNewsList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {newsList.map((news) => (
        <NewsItem key={news.id} news={news} onUpdate={fetchNews} />
      ))}
    </div>
  );
}
