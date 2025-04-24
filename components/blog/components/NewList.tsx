import { getAllNews } from "../actions/getAllNews";

export default async function NewsList() {
  const news = await getAllNews();

  return (
    <div className="space-y-4">
      {news.map(n => (
        <div key={n.id} className="p-4 border rounded">
          <h2 className="font-bold text-lg">{n.title}</h2>
          <p>{n.content}</p>
          <span className="text-sm text-gray-500">{new Date(n.createdAt).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
