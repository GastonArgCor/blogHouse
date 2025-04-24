import CreateBlogForm from '@/components/blog/components/CreateBlogForm';
import BlogList from '@/components/blog/components/BlogList';

export default function Home() {
  return (
    <div>
      <h1>Mi Blog</h1>
      <CreateBlogForm />
      <BlogList />
    </div>
  );
}
