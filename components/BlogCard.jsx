// "use client";
// import { useRouter } from "next/navigation";
// import { Calendar, Edit, Eye, Star } from "lucide-react";
// import { useState } from "react";

// export default function BlogCard({ blog }) {
//   const [imageError, setImageError] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const router = useRouter();

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const getImageUrl = (thumbnail) => {
//     if (!thumbnail || !thumbnail.trim()) {
//       return "/images/blog-placeholder.png";
//     }

//     // Handle Google Drive URLs
//     if (thumbnail.includes("drive.google.com")) {
//       let fileId = "";

//       if (thumbnail.includes("/file/d/")) {
//         fileId = thumbnail.match(/\/file\/d\/(.*?)\//)?.[1];
//       } else if (thumbnail.includes("/open?id=")) {
//         fileId = thumbnail.match(/[?&]id=([^&]*)/)?.[1];
//       } else if (thumbnail.includes("id=")) {
//         fileId = thumbnail.match(/id=([^&]*)/)?.[1];
//       }

//       if (fileId) {
//         return `https://lh3.googleusercontent.com/d/${fileId}=w400`;
//       }
//     }

//     return thumbnail;
//   };

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//     setImageError(false);
//   };

//   const handleImageError = (e) => {
//     console.warn("Image failed to load. Falling back.");
//     const originalSrc = e.target.src;

//     if (originalSrc.includes("googleusercontent.com/d/")) {
//       const fileId = originalSrc.match(/\/d\/(.*?)=/)?.[1];
//       if (fileId) {
//         const fallback = `https://drive.google.com/uc?export=view&id=${fileId}`;
//         console.log("Trying fallback format:", fallback);
//         e.target.src = fallback;
//         return;
//       }
//     }

//     setImageError(true);
//     setImageLoaded(false);
//   };

//   const imageSrc = imageError ? "/images/blog-placeholder.png" : getImageUrl(blog.thumbnail);

//   const handleClick = () => {
//     router.push(`/blogs/${blog.slug}`);
//   };

//   return (
//     <div
//       className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
//       onClick={handleClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           handleClick();
//         }
//       }}
//     >
//       {/* Thumbnail Image */}
//       <div className="relative h-48 w-full overflow-hidden">
//         <img
//           src={imageSrc}
//           alt={blog.title}
//           onLoad={handleImageLoad}
//           onError={handleImageError}
//           className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />

//         {/* Featured Badge */}
//         {blog.featured && (
//           <div className="absolute top-3 left-3">
//             <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
//               <Star size={12} />
//               Featured
//             </span>
//           </div>
//         )}

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       </div>

//       {/* Card Content */}
//       <div className="p-6">
//         {/* Title */}
//         <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
//           {blog.title}
//         </h3>

//         {/* Excerpt */}
//         <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
//           {blog.excerpt || "No excerpt available..."}
//         </p>

//         {/* Metadata */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
//           <div className="flex items-center gap-4">
//             {/* Date */}
//             <div className="flex items-center gap-1.5 text-gray-500">
//               <Calendar size={14} className="text-gray-400" />
//               <span className="text-xs font-medium">{formatDate(blog.createdAt)}</span>
//             </div>

//             {/* Author */}
//             <div className="flex items-center gap-1.5 text-gray-500">
//               <Edit size={14} className="text-gray-400" />
//               <span className="text-xs font-medium">{blog.createdBy || "Admin"}</span>
//             </div>
//           </div>

//           {/* Views */}
//           <div className="flex items-center gap-1.5 text-blue-600">
//             <Eye size={14} />
//             <span className="text-xs font-semibold">{blog.count || 0} views</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useRouter } from "next/navigation";
import { Calendar, Edit, Eye, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function BlogCard({ blog }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Initialize with placeholder to prevent empty src
  const [imageSrc, setImageSrc] = useState('/images/blog-placeholder.png');
  const router = useRouter();

  // Ensure component is mounted before rendering interactive elements
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set initial image source when component mounts or blog changes
  useEffect(() => {
    if (blog?.thumbnail && blog.thumbnail.trim()) {
      const processedUrl = getImageUrl(blog.thumbnail);
      setImageSrc(processedUrl);
      // Reset states when URL changes
      setImageError(false);
      setImageLoaded(false);
    } else {
      setImageSrc('/images/blog-placeholder.png');
      setImageError(true);
      setImageLoaded(true);
    }
  }, [blog?.thumbnail]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getImageUrl = (thumbnail) => {
    if (!thumbnail || !thumbnail.trim()) {
      return "/images/blog-placeholder.png";
    }

    // Handle Google Drive URLs
    if (thumbnail.includes("drive.google.com")) {
      let fileId = "";

      if (thumbnail.includes("/file/d/")) {
        fileId = thumbnail.match(/\/file\/d\/(.*?)\//)?.[1];
      } else if (thumbnail.includes("/open?id=")) {
        fileId = thumbnail.match(/[?&]id=([^&]*)/)?.[1];
      } else if (thumbnail.includes("id=")) {
        fileId = thumbnail.match(/id=([^&]*)/)?.[1];
      }

      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}=w400`;
      }
    }

    return thumbnail;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    console.warn("Image failed to load. Falling back.");
    const originalSrc = e.target.src;

    if (originalSrc.includes("googleusercontent.com/d/")) {
      const fileId = originalSrc.match(/\/d\/(.*?)=/)?.[1];
      if (fileId) {
        const fallback = `https://drive.google.com/uc?export=view&id=${fileId}`;
        console.log("Trying fallback format:", fallback);
        setImageSrc(fallback);
        return;
      }
    }

    // Final fallback to placeholder
    setImageSrc('/images/blog-placeholder.png');
    setImageError(true);
    setImageLoaded(false);
  };

  // Ensure we never have an empty src
  const finalImageSrc = imageSrc && imageSrc.trim() ? imageSrc : '/images/blog-placeholder.png';

  const handleClick = () => {
    router.push(`/blogs/${blog.slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
      onClick={handleClick}
      // Only add interactive attributes after mounting
      {...(mounted && {
        role: "button",
        tabIndex: 0,
        onKeyDown: handleKeyDown,
      })}
    >
      {/* Thumbnail Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={finalImageSrc}
          alt={blog.title || 'Blog post'}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // Force reload on src change to prevent cache issues
          key={finalImageSrc}
        />

        {/* Loading state - only show when actually loading and not using placeholder */}
        {!imageLoaded && !imageError && blog?.thumbnail && finalImageSrc !== '/images/blog-placeholder.png' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-pulse w-10 h-10 bg-gray-300 rounded mx-auto mb-2"></div>
              <span className="text-gray-500 text-base">Loading image...</span>
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {blog.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Star size={12} />
              Featured
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
          {blog.excerpt || "No excerpt available..."}
        </p>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            {/* Date */}
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-xs font-medium">{formatDate(blog.createdAt)}</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-1.5 text-gray-500">
              <Edit size={14} className="text-gray-400" />
              <span className="text-xs font-medium">{blog.createdBy || "Admin"}</span>
            </div>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1.5 text-blue-600">
            <Eye size={14} />
            <span className="text-xs font-semibold">{blog.count || 0} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
