// Utility for managing Unsplash images
// In production, you would use the actual unsplash_tool from the tools
export const unsplash_tool = {
  getImage: (query: string) => {
    // Return a placeholder Unsplash image URL based on query
    const queryParam = query.replace(/\s+/g, '-').toLowerCase();
    return `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400`;
  }
};
