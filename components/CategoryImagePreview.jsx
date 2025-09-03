import React, { useState, useEffect } from 'react';

// Image preview component with same logic as CategoryCard
export default function CategoryImagePreview({ imgUrl, name, size = 'full', shape = 'rounded', className = '', style = {} }) {
  const [imageSrc, setImageSrc] = useState(getImageUrl(imgUrl));
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageSrc(getImageUrl(imgUrl));
    setImageError(false);
  }, [imgUrl]);

  function getImageUrl(thumbnail) {
    if (!thumbnail || !thumbnail.trim()) {
      return '/images/blog-placeholder.png';
    }
    // Support more Google Drive link formats
    if (thumbnail.includes('drive.google.com')) {
      let fileId = '';
      // /file/d/FILEID/
      if (/\/file\/d\//.test(thumbnail)) {
        fileId = (thumbnail.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || [])[1];
      }
      // /uc?id=FILEID
      else if (/uc\?id=/.test(thumbnail)) {
        fileId = (thumbnail.match(/uc\?id=([a-zA-Z0-9_-]+)/) || [])[1];
      }
      // /open?id=FILEID
      else if (/open\?id=/.test(thumbnail)) {
        fileId = (thumbnail.match(/open\?id=([a-zA-Z0-9_-]+)/) || [])[1];
      }
      // id=FILEID anywhere
      else if (/id=/.test(thumbnail)) {
        fileId = (thumbnail.match(/id=([a-zA-Z0-9_-]+)/) || [])[1];
      }
      // /d/FILEID (preview/share links)
      else if (/\/d\//.test(thumbnail)) {
        fileId = (thumbnail.match(/\/d\/([a-zA-Z0-9_-]+)/) || [])[1];
      }
      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}=w400`;
      }
    }
    return thumbnail;
  }

  const handleImageError = (e) => {
    const originalSrc = e.target.src;
    // Fallback logic for Google Drive
    if (originalSrc.includes('googleusercontent.com/d/')) {
      const fileId = (originalSrc.match(/\/d\/(.*?)=/) || [])[1];
      if (fileId) {
        setImageSrc(`https://drive.google.com/uc?export=view&id=${fileId}`);
        return;
      }
    }
    setImageSrc('/images/blog-placeholder.png');
    setImageError(true);
  };

  // Size/shape classes
  let sizeClass = '';
  if (size === 'small') sizeClass = 'w-14 h-14';
  else if (size === 'full') sizeClass = 'w-full h-full';
  else sizeClass = size; // allow custom

  let shapeClass = '';
  if (shape === 'rounded') shapeClass = 'rounded-lg';
  else if (shape === 'circle') shapeClass = 'rounded-full';
  else shapeClass = shape; // allow custom

  if (!imgUrl || imageError) {
    return (
      <img
        src="/images/blog-placeholder.png"
        alt={name || 'No image'}
        className={`object-cover border border-gray-200 bg-gray-100 ${sizeClass} ${shapeClass} ${className}`}
        style={style}
        aria-hidden={imageError ? 'true' : 'false'}
      />
    );
  }
  return (
    <img
      src={imageSrc}
      alt={name}
      className={`object-cover border border-gray-200 bg-gray-100 ${sizeClass} ${shapeClass} ${className}`}
      onError={handleImageError}
      style={style}
    />
  );
}
