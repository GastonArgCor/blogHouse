'use client';
import { useEffect, useState } from 'react';
import { Blog } from '@/components/blog/interfaces/Blog';

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
        </div>
      ))}
    </div>
  );
}
