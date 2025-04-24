'use client';

import { useState } from 'react';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      window.location.reload(); // Simple recarga para mostrar el nuevo post
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="border px-3 py-2 w-full"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="border px-3 py-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Crear Post
      </button>
    </form>
  );
}
