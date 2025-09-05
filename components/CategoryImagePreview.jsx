// import React, { useState, useEffect } from 'react';

// // Image preview component with same logic as CategoryCard
// export default function CategoryImagePreview({ imgUrl, name, size = 'full', shape = 'rounded', className = '', style = {} }) {
//   const [imageSrc, setImageSrc] = useState(getImageUrl(imgUrl));
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     setImageSrc(getImageUrl(imgUrl));
//     setImageError(false);
//   }, [imgUrl]);

//   function getImageUrl(thumbnail) {
//     if (!thumbnail || !thumbnail.trim()) {
//       return '/images/blog-placeholder.png';
//     }
//     // Support more Google Drive link formats
//     if (thumbnail.includes('drive.google.com')) {
//       let fileId = '';
//       // /file/d/FILEID/
//       if (/\/file\/d\//.test(thumbnail)) {
//         fileId = (thumbnail.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || [])[1];
//       }
//       // /uc?id=FILEID
//       else if (/uc\?id=/.test(thumbnail)) {
//         fileId = (thumbnail.match(/uc\?id=([a-zA-Z0-9_-]+)/) || [])[1];
//       }
//       // /open?id=FILEID
//       else if (/open\?id=/.test(thumbnail)) {
//         fileId = (thumbnail.match(/open\?id=([a-zA-Z0-9_-]+)/) || [])[1];
//       }
//       // id=FILEID anywhere
//       else if (/id=/.test(thumbnail)) {
//         fileId = (thumbnail.match(/id=([a-zA-Z0-9_-]+)/) || [])[1];
//       }
//       // /d/FILEID (preview/share links)
//       else if (/\/d\//.test(thumbnail)) {
//         fileId = (thumbnail.match(/\/d\/([a-zA-Z0-9_-]+)/) || [])[1];
//       }
//       if (fileId) {
//         console.log(`https://lh3.googleusercontent.com/d/${fileId}=w400`);
//         return `https://lh3.googleusercontent.com/d/${fileId}=w400`;
//       }
//     }
//     console.log('Using direct image URL:', thumbnail);
//     return thumbnail;
//   }

//   const handleImageError = (e) => {
//     const originalSrc = e.target.src;
//     // Fallback logic for Google Drive
//     if (originalSrc.includes('googleusercontent.com/d/')) {
//       console.log('Fallback to Google Drive URL');
//       const fileId = (originalSrc.match(/\/d\/(.*?)=/) || [])[1];
//       if (fileId) {
//         setImageSrc(`https://drive.google.com/uc?export=view&id=${fileId}`);
//         return;
//       }
//     }
//     setImageSrc('/images/blog-placeholder.png');
//     setImageError(true);
//   };
// console.log('Rendering image with src:', imageSrc);
//   // Size/shape classes
//   let sizeClass = '';
//   if (size === 'small') sizeClass = 'w-14 h-14';
//   else if (size === 'full') sizeClass = 'w-full h-full';
//   else sizeClass = size; // allow custom

//   let shapeClass = '';
//   if (shape === 'rounded') shapeClass = 'rounded-lg';
//   else if (shape === 'circle') shapeClass = 'rounded-full';
//   else shapeClass = shape; // allow custom

//   if (!imgUrl || imageError) {
//     console.log('Displaying placeholder image');
//     return (
//       <img
//         src="/images/blog-placeholder.png"
//         alt={name || 'No image'}
//         className={`object-cover border border-gray-200 bg-gray-100 ${sizeClass} ${shapeClass} ${className}`}
//         style={style}
//         aria-hidden={imageError ? 'true' : 'false'}
//       />
//     );
//   }
//   return (
//     <img
//       src={imageSrc}
//       alt={name}
//       className={`object-cover border border-gray-200 bg-gray-100 ${sizeClass} ${shapeClass} ${className}`}
//       onError={handleImageError}
//       style={style}
//     />
//   );
// }
import React, { useState, useEffect } from 'react';

export default function CategoryImagePreview({
  imgUrl,
  name,
  size = 'full',
  shape = 'rounded',
  className = '',
  style = {},
}) {
  const [imageSrc, setImageSrc] = useState('/images/blog-placeholder.png'); // ✅ safe default
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (imgUrl && imgUrl.trim()) {
      setImageSrc(getImageUrl(imgUrl));
      setImageError(false);
    } else {
      setImageSrc('/images/blog-placeholder.png'); // fallback if empty
    }
  }, [imgUrl]);

  function getImageUrl(url) {
    if (!url || !url.trim()) {
      return '/images/blog-placeholder.png';
    }

    if (url.includes('drive.google.com')) {
      let fileId = '';

      if (/\/file\/d\//.test(url)) {
        fileId = (url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || [])[1];
      } else if (/uc\?id=/.test(url)) {
        fileId = (url.match(/uc\?id=([a-zA-Z0-9_-]+)/) || [])[1];
      } else if (/open\?id=/.test(url)) {
        fileId = (url.match(/open\?id=([a-zA-Z0-9_-]+)/) || [])[1];
      } else if (/id=/.test(url)) {
        fileId = (url.match(/id=([a-zA-Z0-9_-]+)/) || [])[1];
      } else if (/\/d\//.test(url)) {
        fileId = (url.match(/\/d\/([a-zA-Z0-9_-]+)/) || [])[1];
      }

      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}=w400`; // ✅ lh3 format
      }
    }

    return url;
  }

  const handleImageError = () => {
    setImageSrc('/images/blog-placeholder.png');
    setImageError(true);
  };

  // Tailwind classes
  let sizeClass =
    size === 'small'
      ? 'w-14 h-14'
      : size === 'full'
      ? 'w-full h-full'
      : size;

  let shapeClass =
    shape === 'rounded'
      ? 'rounded-lg'
      : shape === 'circle'
      ? 'rounded-full'
      : shape;

  return (
    <img
      src={imageSrc || '/images/blog-placeholder.png'} // ✅ never empty
      alt={name || 'Image preview'}
      className={`object-cover border border-gray-200 bg-gray-100 ${sizeClass} ${shapeClass} ${className}`}
      onError={handleImageError}
      style={style}
    />
  );
}
