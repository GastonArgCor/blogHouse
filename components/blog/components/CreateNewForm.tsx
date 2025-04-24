'use client';

import { useState } from 'react';
import { createNews } from '../actions/createNews';

export default function CreateNewsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNews(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Crear noticia</button>
    </form>
  );
}
