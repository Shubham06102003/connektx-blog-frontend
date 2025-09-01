import { publicApi } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import FeaturedSection from '@/components/FeaturedSection';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';

export const metadata = {
  title: 'Blog Platform - Latest Articles and Stories',
  description: 'Discover the latest articles, insights, and stories from our expert writers.',
  keywords: 'blog, articles, stories, insights, latest news',
  openGraph: {
    title: 'Blog Platform - Latest Articles and Stories',
    description: 'Discover the latest articles, insights, and stories from our expert writers.',
    type: 'website',
  },
};

async function getHomePageData() {
  try {
    const [blogsRes, featuredRes, categoriesRes] = await Promise.all([
      publicApi.getPublishedBlogs(),
      publicApi.getFeaturedBlogs(),
      publicApi.getCategories(),
    ]);
    
    return {
      blogs: blogsRes.data.slice(0, 6), // Latest 6 blogs
      featuredBlogs: featuredRes.data.slice(0, 3), // Top 3 featured
      categories: categoriesRes.data,
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return { blogs: [], featuredBlogs: [], categories: [] };
  }
}

export default async function HomePage() {
  const { blogs, featuredBlogs, categories } = await getHomePageData();

  return (
  <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Header */}
  <header className="bg-white shadow-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-700 drop-shadow-sm">
              ConnektX Blog
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-700 hover:text-blue-500 font-semibold transition-colors">Home</Link>
              <Link href="/blogs" className="text-blue-500 hover:text-blue-700 font-medium transition-colors">Blogs</Link>
              <Link href="/categories" className="text-blue-500 hover:text-blue-700 font-medium transition-colors">Categories</Link>
            </nav>
            <Link 
              href="/admin" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Featured Blogs Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-12 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center drop-shadow">Featured Blogs</h2>
            <FeaturedSection blogs={featuredBlogs} />
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 rounded-2xl bg-white/80 shadow mb-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700">Explore Categories</h2>
            <Link href="/categories" className="text-blue-600 hover:text-blue-800 font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Latest Blogs Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-700">Latest Blogs</h2>
            <Link 
              href="/blogs" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
