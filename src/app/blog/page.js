'use client';

import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { blogService } from '../utils/api';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getAll();
        setBlogPosts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Halaman Blog"
        description="Kami menyediakan blog seputar teknologi"
      />

      <div className="container mx-auto px-4 py-12 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={post.image_url || 'https://placehold.co/600x400'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  {post.category_names && post.category_names.map((categoryName, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2"
                    >
                      {categoryName}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-4">{post.title}</h3>
                <div className="text-gray-600 text-sm mb-4">
                  {new Date(post.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <a
                  href={`#`}
                  className="inline-block text-2xl transition-transform hover:translate-x-2"
                >
                  →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
