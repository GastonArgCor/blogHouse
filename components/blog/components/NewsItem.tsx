"use client";

import { useState } from "react";
import Image from "next/image";
import { News } from "../interfaces/News";
import { deleteNews } from "../actions/deleteNews";
import { updateNews } from "../actions/updateNews";
import { format } from "date-fns";  // Importa date-fns

interface Props {
  news: News;
  onUpdate: () => void;
}

export default function NewsItem({ news, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);

  const handleDelete = async () => {
    try {
      await deleteNews(news.id);
      onUpdate();
    } catch (error: any) {
      alert("Error al eliminar la noticia: " + error.message);
      console.error("Error eliminando noticia:", error);
    }
  };

  const handleUpdate = async () => {
    await updateNews(news.id, title, content);
    setIsEditing(false);
    onUpdate();
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded border border-gray-700 bg-black shadow-sm text-white">
      {news.imageUrl && (
        <Image
          src={news.imageUrl}
          alt={news.title}
          width={96}
          height={96}
          className="rounded object-cover"
        />
      )}

      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 mt-2"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleUpdate}
                className="bg-green-600 px-4 py-1 rounded text-white hover:bg-green-700 transition"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-700 px-4 py-1 rounded text-gray-300 hover:text-white transition"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-bold text-lg">{news.title}</h2>
            <p className="text-gray-300">{news.content}</p>
            <span className="text-sm text-gray-400">
              {format(new Date(news.createdAt), "dd/MM/yyyy HH:mm:ss")}
            </span>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 text-sm hover:underline"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 text-sm hover:underline"
              >
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
