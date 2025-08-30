import BlogCard from './BlogCard';

export default function FeaturedSection({ blogs }) {
  if (blogs.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Stories</h2>
          <p className="text-blue-100 text-lg">Discover our most popular and trending articles</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="transform hover:scale-105 transition-transform">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
