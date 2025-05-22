export async function updateNews(id: string, title: string, content: string) {
  const res = await fetch(`/api/news/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error actualizando la noticia");
  }

  return res.json();
}
