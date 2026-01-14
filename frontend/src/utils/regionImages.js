// Map of state names to specific high-quality Unsplash image IDs
const regionImages = {
  // Major Tourist States
  'Rajasthan': '1709338573277-c161cbf8702c', // Jal Mahal, Jaipur
  'Kerala': '1602216056096-3b40cc0c9944',     // Backwaters
  'Goa': '1512343879784-a960bf40e7f2',        // Beach
  'Maharashtra': '1598434192043-71111c1b3f41',// Gateway of India (Mumbai)
  'Uttar Pradesh': '1706186839147-0d708602587b', // Varanasi
  'Himachal Pradesh': '1584395631446-e41b0fc3f68d', // Himalayas
  
  // Shared/Related Mappings
  'Uttarakhand': '1584395631446-e41b0fc3f68d', // Use same Himalayan image
  'Jammu and Kashmir': '1584395631446-e41b0fc3f68d', // Use same Himalayan image
  'Delhi': '1598434192043-71111c1b3f41', // Use Mumbai city vibe as fallback
  'West Bengal': '1706186839147-0d708602587b', // Use spiritual river vibe (Varanasi)
};

// Default image (Taj Mahal) if no specific region match
const DEFAULT_IMAGE = '1524492412937-b28074a5d7da';

/**
 * Get a high-quality Unsplash image URL for a specific region/state
 * @param {string} state - The state or region name
 * @param {number} width - optional width for the image
 * @returns {string} - The full Unsplash URL
 */
export const getRegionImage = (state, width = 800) => {
  if (!state) return `https://images.unsplash.com/photo-${DEFAULT_IMAGE}?w=${width}`;
  
  // Normalize state name for case-insensitive matching
  const normalizedState = Object.keys(regionImages).find(
    key => key.toLowerCase() === state.toLowerCase()
  );

  const imageId = normalizedState ? regionImages[normalizedState] : DEFAULT_IMAGE;
  return `https://images.unsplash.com/photo-${imageId}?w=${width}`;
};

export const getHeroImage = (place) => {
    if (place?.heroImage) return place.heroImage;
    if (place?.state) return getRegionImage(place.state, 1920); // Higher res for hero
    return getRegionImage(null, 1920);
};
