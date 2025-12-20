{/* Image utility function to handle Cloudinary URLs and legacy local paths */}

/**
 * Get image URL - handles both Cloudinary URLs and legacy local paths
 * @param {string} imagePath - Image path from database
 * @param {string} type - 'thumbnail' or 'avatar'
 * @returns {string} - Full image URL
 */
export const getImageUrl = (imagePath, type = 'thumbnail') => {
  if (!imagePath) {
    // Return default placeholder based on type
    return type === 'avatar' 
      ? 'https://via.placeholder.com/150' 
      : 'https://via.placeholder.com/400x300';
  }
  
  // If it's already a full URL (Cloudinary), return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Legacy local file path - return placeholder
  // In production, these won't work, so show placeholder
  return type === 'avatar' 
    ? 'https://via.placeholder.com/150' 
    : 'https://via.placeholder.com/400x300';
};

