import React, { useState, useEffect } from 'react';

export default function ImagePreview({
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

  const handleImageError = (e) => {
    // If already tried fallback, show placeholder
    if (imageSrc === '/images/blog-placeholder.png') {
      setImageError(true);
      return;
    }

    // If current src is lh3.googleusercontent.com, try drive.google.com fallback
    if (imageSrc.includes('lh3.googleusercontent.com/d/')) {
      const match = imageSrc.match(/\/d\/([a-zA-Z0-9_-]+)=/);
      const fileId = match && match[1];
      if (fileId) {
        setImageSrc(`https://drive.google.com/uc?export=view&id=${fileId}`);
        return;
      }
    }

    // Otherwise, show placeholder
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
      referrerPolicy="no-referrer"
    />
  );
}
