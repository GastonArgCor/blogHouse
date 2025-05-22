"use client";

import React, { useState, useEffect } from "react";
import { News } from "../interfaces/News";
import NewsItem from "./NewsItem";
import CreateNewsForm from "@/components/blog/components/CreateNewForm";

interface Props {
  initialNews: News[];
}

export default function NewsManager({ initialNews }: Props) {
  const [newsList, setNewsList] = useState<News[]>(initialNews);

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

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <CreateNewsForm onNewsCreated={fetchNews} />
      <div className="mt-8 space-y-4">
        {newsList.map((news) => (
          <NewsItem key={news.id} news={news} onUpdate={fetchNews} />
        ))}
      </div>
    </>
  );
}
