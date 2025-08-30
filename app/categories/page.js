import { publicApi } from '@/lib/api';
import Link from 'next/link';
import { FolderOpen } from 'lucide-react';

export const metadata = {
  title: 'Categories - Blog Platform',
  description: 'Browse articles by category',
};

async function getCategories() {
  try {
    const response = await publicApi.getCategories();
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

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
              <Link href="/blogs" className="text-gray-500 hover:text-blue-600">Blogs</Link>
              <Link href="/categories" className="text-gray-900 hover:text-blue-600">Categories</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-gray-600">Browse articles by topic and category</p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No categories available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center mb-3">
                    <FolderOpen className="text-blue-600 mr-3" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  </div>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
