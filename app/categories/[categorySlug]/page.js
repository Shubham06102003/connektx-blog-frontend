"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api'; // Adjust the import path based on your project structure

export default function BlogsByCategoryPage() {
  const { categorySlug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      if (!categorySlug) return;

      try {
        setLoading(true);
        setError(null);
        
        // Assuming your API returns { blogs: [], category: {} } or similar
        const response = await api.get(`/categories/${categorySlug}/blogs`);
        
        setBlogs(response.data.blogs || response.data);
        setCategory(response.data.category || { name: categorySlug });
      } catch (err) {
        setError(err.message || 'Failed to fetch blogs');
        console.error('Error fetching blogs by category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsByCategory();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {category?.name || categorySlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h1>
        {category?.description && (
          <p className="text-gray-600 text-lg">{category.description}</p>
        )}
        <div className="mt-2 text-sm text-gray-500">
          {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} found
        </div>
      </div>

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h3>
          <p className="text-gray-500">There are no articles in this category yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.id || blog.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={blog.featuredImage} 
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  <a 
                    href={`/blogs/${blog.slug}`} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {blog.title}
                  </a>
                </h2>
                
                {blog.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                )}
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    {blog.author && (
                      <span>By {blog.author.name || blog.author}</span>
                    )}
                    {blog.publishedAt && (
                      <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                  {blog.readTime && (
                    <span>{blog.readTime} min read</span>
                  )}
                </div>
                
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination (if needed) */}
      {blogs.length > 0 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex space-x-2">
            <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
              2
            </button>
            <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
    </div>
  );
}
