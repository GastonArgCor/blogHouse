export async function deleteNews(id: string) {
  const res = await fetch(`/api/news/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error eliminando la noticia");
  }

  return res.json();
}
