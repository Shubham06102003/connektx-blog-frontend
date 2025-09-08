// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';

// export default function CategoryCard({ category }) {
//   const [imageError, setImageError] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const getImageUrl = (url) => {
//     // Return empty string if no URL provided
//     if (!url || !url.trim()) {
//       return '';
//     }

//     // Handle Google Drive URLs
//     if (url.includes("drive.google.com")) {
//       let fileId = '';
      
//       // Extract file ID from various Google Drive URL formats
//       if (url.includes('/file/d/')) {
//         fileId = url.match(/\/file\/d\/(.*?)\//)?.[1];
//       } else if (url.includes('/open?id=')) {
//         fileId = url.match(/[?&]id=([^&]*)/)?.[1];
//       } else if (url.includes('id=')) {
//         fileId = url.match(/id=([^&]*)/)?.[1];
//       }
      
//       if (fileId) {
//         // Use thumbnail format for better compatibility
//         const link = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
//         console.log('Converted Google Drive URL:', link);
//         return link;
//       }
//     }
    
//     // For all other URLs (regular image URLs), return as-is
//     console.log('Using direct image URL:', url);
//     return url;
//   };

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//     setImageError(false);
//   };

//   const handleImageError = (e) => {
//     console.log('Primary image failed to load, trying alternatives...');
    
//     const originalSrc = e.target.src;
    
//     // If it's a Google Drive thumbnail that failed, try the export format
//     if (originalSrc.includes('thumbnail')) {
//       const fileId = originalSrc.match(/id=([^&]*)/)?.[1];
//       if (fileId) {
//         const alternativeUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
//         console.log('Trying Google Drive export format:', alternativeUrl);
//         e.target.src = alternativeUrl;
//         return; // Don't set error state yet, let the alternative load
//       }
//     }
    
//     // If it's a Google Drive export that failed, try direct format
//     if (originalSrc.includes('uc?export=view')) {
//       const fileId = originalSrc.match(/id=([^&]*)/)?.[1];
//       if (fileId) {
//         const alternativeUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
//         console.log('Trying Google Drive direct format:', alternativeUrl);
//         e.target.src = alternativeUrl;
//         return;
//       }
//     }
    
//     // All alternatives failed or it's not a Google Drive URL
//     setImageError(true);
//     setImageLoaded(false);
//   };

//   return (
//     <Link
//       href={`/categories/${category.slug}`}
//       className="w-full max-w-[420px] aspect-[4/3] rounded-2xl shadow-lg overflow-hidden relative group transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer block"
//       prefetch={false}
//     >
//       {category.imgUrl ? (
//         <div className="absolute inset-0 w-full h-full">
//           <img
//             src={getImageUrl(category.imgUrl)}
//             alt={category.name}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//             onLoad={handleImageLoad}
//             onError={handleImageError}
//             style={{ display: imageError ? 'none' : 'block' }}
//           />
//           {/* Gradient overlay for text readability */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//           {/* Loading state */}
//           {!imageLoaded && !imageError && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//               <div className="text-center">
//                 <div className="animate-pulse w-10 h-10 bg-gray-300 rounded mx-auto mb-2"></div>
//                 <span className="text-gray-500 text-base">Loading image...</span>
//               </div>
//             </div>
//           )}
//           {/* Error state */}
//           {imageError && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//               <div className="text-center">
//                 <div className="text-gray-400 text-3xl mb-2">📷</div>
//                 <span className="text-gray-500 text-base">Image unavailable</span>
//                 <p className="text-xs text-gray-400 mt-1">Check URL or permissions</p>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
//           <div className="text-center">
//             <div className="text-gray-400 text-3xl mb-2">🖼️</div>
//             <span className="text-gray-500 text-base">No Image Available</span>
//           </div>
//         </div>
//       )}
//       {/* Centered category name over image */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center drop-shadow-lg px-4 truncate" title={category.name}>
//           {category.name}
//         </h2>
//       </div>
//     </Link>
//   );
// }
'use client';

import React from 'react';
import Link from 'next/link';
import ImagePreview from './ImagePreview';

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="w-full max-w-[420px] aspect-[4/3] rounded-3xl shadow-xl overflow-hidden relative group transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer block border border-blue-50 bg-gradient-to-br from-blue-50 via-white to-blue-100"
      prefetch={false}
      style={{ fontFamily: 'Inter, Nunito Sans, Lato, sans-serif' }}
    >
      <div className="absolute inset-0 w-full h-full">
  <ImagePreview
          imgUrl={category.imgUrl}
          name={category.name}
          size="full"
          shape="rounded-3xl"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-700/20 to-transparent" />
      </div>
      {/* Centered category name over image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center drop-shadow-lg px-4 truncate tracking-tight" title={category.name}>
          {category.name}
        </h2>
      </div>
    </Link>
  );
}
