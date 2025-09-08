import { publicApi } from '@/lib/api';
import Link from 'next/link';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
  <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight text-blue-900">
            Categories
          </h1>
          <p className="text-xl text-blue-700 font-medium">
            Browse articles by topic and category
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-2xl border border-blue-50 max-w-xl mx-auto">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-300 text-4xl">📁</span>
            </div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">No Categories Found</h3>
            <p className="text-blue-400 mb-6">There are no categories available at the moment.</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-base"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            {/* Category count */}
            <div className="mb-8 text-center">
              <p className="text-blue-600 text-lg">
                {categories.length} {categories.length === 1 ? 'category' : 'categories'} available
              </p>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 animate-fade-in-up">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  showDescription={true}
                  size="medium"
                  className="w-full"
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
