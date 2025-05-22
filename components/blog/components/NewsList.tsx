"use client";

import { News } from "../interfaces/News";
import NewsItem from "./NewsItem";

interface Props {
  newsList: News[];
  onUpdate: () => void;
}

export default function NewsList({ newsList, onUpdate }: Props) {
  return (
    <div className="space-y-4 mt-6">
      {newsList.map((news) => (
        <NewsItem key={news.id} news={news} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
