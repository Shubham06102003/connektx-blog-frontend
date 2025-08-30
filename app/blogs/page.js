import { publicApi } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export const metadata = {
  title: 'All Blogs - Blog Platform',
  description: 'Browse all published articles and blog posts.',
};

async function getBlogs() {
  try {
    const response = await publicApi.getPublishedBlogs();
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              BlogPlatform
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link>
              <Link href="/blogs" className="text-gray-900 hover:text-blue-600">Blogs</Link>
              <Link href="/categories" className="text-gray-500 hover:text-blue-600">Categories</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blogs</h1>
          <p className="text-gray-600">Discover all our published articles and stories</p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No blogs published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
