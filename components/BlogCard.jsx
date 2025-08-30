import Link from 'next/link';
import { Calendar, Eye } from 'lucide-react';

export default function BlogCard({ blog }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {blog.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Featured
            </span>
          )}
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Published
          </span>
        </div>
        
        <Link href={`/blogs/${blog.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
            {blog.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{blog.count} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
