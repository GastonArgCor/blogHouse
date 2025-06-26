"use client";

import { useState } from "react";
interface Props {
  onNewsCreated: () => void;
}

export default function CreateNewsForm({ onNewsCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "unsigned_preset"); // Cambia por el tuyo

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dsjwz4gdn/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw new Error("Error al subir la imagen");

        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (error) {
        alert("Error subiendo imagen: " + (error as Error).message);
        setIsSubmitting(false);
        return; // Salir para evitar continuar sin imagen
      }
    }

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      if (!res.ok) throw new Error("Error creando noticia");

      // Limpieza y refresco
      setTitle("");
      setContent("");
      setImage(null);
      setFileName("");
      onNewsCreated();
    } catch (error) {
      alert("Error creando noticia: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    setFileName(file ? file.name : "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-2 w-full rounded bg-gray-800 text-white"
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="p-2 w-full rounded bg-gray-800 text-white"
      />

      <label
        htmlFor="fileInput"
        className="block w-max px-4 py-2 bg-cyan-500 text-white rounded cursor-pointer text-center mb-4"
      >
        {fileName || "Seleccionar archivo"}
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="block w-max bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Creando..." : "Crear noticia"}
      </button>
    </form>
  );
}
