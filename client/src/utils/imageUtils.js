{/* Image utility function to handle Cloudinary URLs and legacy local paths */}

/**
 * Get image URL - handles both Cloudinary URLs and legacy local paths
 * @param {string} imagePath - Image path from database
 * @param {string} type - 'thumbnail' or 'avatar'
 * @returns {string} - Full image URL
 */
export const getImageUrl = (imagePath, type = 'thumbnail') => {
  // Handle null, undefined, or empty values
  if (!imagePath) {
    return type === 'avatar' 
      ? 'https://via.placeholder.com/150' 
      : 'https://via.placeholder.com/400x300';
  }
  
  // Handle File objects (for preview before upload)
  if (imagePath instanceof File) {
    return URL.createObjectURL(imagePath);
  }
  
  // Ensure it's a string before calling string methods
  const imagePathStr = String(imagePath);
  
  // If it's already a full URL (Cloudinary), return as-is
  if (imagePathStr.startsWith('http://') || imagePathStr.startsWith('https://')) {
    return imagePathStr;
  }
  
  // Legacy local file path - return placeholder
  return type === 'avatar' 
    ? 'https://via.placeholder.com/150' 
    : 'https://via.placeholder.com/400x300';
};

