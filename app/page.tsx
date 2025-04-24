import CreateNewsForm from "components/blog/components/CreateNewForm";
import NewsList from "components/blog/components/NewList";

export default function HomePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Noticias</h1>
      <CreateNewsForm />
      <hr className="my-6" />
      <NewsList />
    </div>
  );
}
