// "use client";
// import { useRouter } from 'next/navigation';
// import { Calendar, Edit, Eye, Star } from 'lucide-react';
// import { useState, useEffect } from 'react';

// export default function BlogCard({ blog }) {
//   const [imageError, setImageError] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [imageSrc, setImageSrc] = useState('/images/blog-placeholder.png');
//   const router = useRouter();

//   useEffect(() => { setMounted(true); }, []);
//   useEffect(() => {
//     if (blog?.thumbnail && blog.thumbnail.trim()) {
//       const processedUrl = getImageUrl(blog.thumbnail);
//       setImageSrc(processedUrl);
//       setImageError(false);
//       setImageLoaded(false);
//     } else {
//       setImageSrc('/images/blog-placeholder.png');
//       setImageError(true);
//       setImageLoaded(true);
//     }
//   }, [blog?.thumbnail]);

//   const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   const getImageUrl = (thumbnail) => {
//     if (!thumbnail || !thumbnail.trim()) return '/images/blog-placeholder.png';
//     if (thumbnail.includes('drive.google.com')) {
//       let fileId = '';
//       if (thumbnail.includes('/file/d/')) fileId = thumbnail.match(/\/file\/d\/(.*?)\//)?.[1];
//       else if (thumbnail.includes('/open?id=')) fileId = thumbnail.match(/[?&]id=([^&]*)/)?.[1];
//       else if (thumbnail.includes('id=')) fileId = thumbnail.match(/id=([^&]*)/)?.[1];
//       if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}=w400`;
//     }
//     return thumbnail;
//   };
//   const handleImageLoad = () => { setImageLoaded(true); setImageError(false); };
//   const handleImageError = (e) => {
//     const originalSrc = e.target.src;
//     if (originalSrc.includes('googleusercontent.com/d/')) {
//       const fileId = originalSrc.match(/\/d\/(.*?)=/)?.[1];
//       if (fileId) { e.target.src = `https://drive.google.com/uc?export=view&id=${fileId}`; return; }
//     }
//     setImageError(true); setImageLoaded(false);
//   };
//   const handleClick = () => router.push(`/blogs/${blog.slug}`);

//   return (
//     <div
//       className="cursor-pointer bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group border border-blue-50"
//       onClick={handleClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
//       style={{ fontFamily: 'Inter, Nunito Sans, Lato, sans-serif' }}
//     >
//       {/* Thumbnail Image */}
//       <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-white">
//         <img
//           src={imageSrc}
//           alt={blog.title}
//           onLoad={handleImageLoad}
//           onError={handleImageError}
//           className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-t-3xl"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//         {/* Featured Badge */}
//         {blog.featured && (
//           <div className="absolute top-3 left-3">
//             <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
//               <Star size={12} />
//               Featured
//             </span>
//           </div>
//         )}
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />
//       </div>
//       {/* Card Content */}
//       <div className="p-6 bg-white rounded-b-3xl">
//         {/* Title */}
//         <h3 className="text-2xl font-extrabold text-blue-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors tracking-tight">
//           {blog.title}
//         </h3>
//         {/* Excerpt */}
//         <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-base">
//           {blog.excerpt || 'No excerpt available...'}
//         </p>
//         {/* Metadata */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-blue-100">
//           <div className="flex items-center gap-4">
//             {/* Date */}
//             <div className="flex items-center gap-1.5 text-blue-400">
//               <Calendar size={15} className="text-blue-300" />
//               <span className="text-xs font-semibold">{formatDate(blog.createdAt)}</span>
//             </div>
//             {/* Author */}
//             <div className="flex items-center gap-1.5 text-blue-400">
//               <Edit size={15} className="text-blue-300" />
//               <span className="text-xs font-semibold">{blog.createdBy || 'Admin'}</span>
//             </div>
//           </div>
//           {/* Views */}
//           <div className="flex items-center gap-1.5 text-purple-600">
//             <Eye size={15} />
//             <span className="text-xs font-bold">{blog.count || 0} views</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useRouter } from "next/navigation";
import { Calendar, Edit, Eye, Star } from "lucide-react";

export default function BlogCard({ blog }) {
  const router = useRouter();

  // Utility: format date
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Utility: process Google Drive thumbnails
  const getImageUrl = (thumbnail) => {
    if (!thumbnail || !thumbnail.trim()) return "/images/blog-placeholder.png";
    if (thumbnail.includes("drive.google.com")) {
      let fileId = "";
      if (thumbnail.includes("/file/d/"))
        fileId = thumbnail.match(/\/file\/d\/(.*?)\//)?.[1];
      else if (thumbnail.includes("/open?id="))
        fileId = thumbnail.match(/[?&]id=([^&]*)/)?.[1];
      else if (thumbnail.includes("id="))
        fileId = thumbnail.match(/id=([^&]*)/)?.[1];

      if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}=w400`;
    }
    return thumbnail;
  };

  const imageSrc = getImageUrl(blog?.thumbnail);

  const handleClick = () => router.push(`/blogs/${blog.slug}`);

  return (
    <div
      className="cursor-pointer bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group border border-blue-50"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{ fontFamily: "Inter, Nunito Sans, Lato, sans-serif" }}
    >
      {/* Thumbnail Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-white">
        <img
          src={imageSrc}
          alt={blog.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-t-3xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const originalSrc = e.currentTarget.src;
            if (originalSrc.includes("googleusercontent.com/d/")) {
              const fileId = originalSrc.match(/\/d\/(.*?)=/)?.[1];
              if (fileId) {
                e.currentTarget.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                return;
              }
            }
            e.currentTarget.src = "/images/blog-placeholder.png";
          }}
        />

        {/* Featured Badge */}
        {blog.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Star size={12} />
              Featured
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />
      </div>

      {/* Card Content */}
      <div className="p-6 bg-white rounded-b-3xl">
        <h3 className="text-2xl font-extrabold text-blue-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors tracking-tight">
          {blog.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-base">
          {blog.excerpt || "No excerpt available..."}
        </p>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-blue-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-blue-400">
              <Calendar size={15} className="text-blue-300" />
              <span className="text-xs font-semibold">
                {formatDate(blog.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400">
              <Edit size={15} className="text-blue-300" />
              <span className="text-xs font-semibold">
                {blog.createdBy || "Admin"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-purple-600">
            <Eye size={15} />
            <span className="text-xs font-bold">{blog.count || 0} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
