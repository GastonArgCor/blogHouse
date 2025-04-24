'use client';

import { useEffect, useState } from 'react';
import { Blog } from '../interfaces/blog';

export default function PostList() {
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="mt-6">
      {posts.map((post) => (
        <div key={post.id} className="border-b py-2">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
