import BlogCard from './BlogCard';

export default function FeaturedSection({ blogs }) {
  if (!blogs || blogs.length === 0) return null;

  // Highlight the first featured blog
  const [first, ...rest] = blogs;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
        {/* First featured blog - highlight */}
        {first && (
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="bg-white rounded-3xl shadow-2xl h-full flex flex-col justify-between animate-fade-in-up">
              <BlogCard blog={first} />
            </div>
          </div>
        )}
        {/* Other featured blogs */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
          {rest.map((blog, idx) => (
            <div
              key={blog.id}
              className="transition-transform duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${(idx + 1) * 0.08 + 0.1}s` }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
