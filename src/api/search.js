import api from './axios';

export const searchAPI = {
  // Search listings
  searchListings: async (params = {}) => {
    try {
      console.log('🔍 Search API called with params:', params);
      const response = await api.get('/search', { params });
      console.log('🔍 Search API response:', response.data);
      
      // Ensure we always return a consistent structure
      if (!response.data) {
        return { data: [], total: 0, message: 'No results found' };
      }
      
      // If response.data is an array, wrap it in expected structure
      if (Array.isArray(response.data)) {
        return { 
          data: response.data, 
          total: response.data.length,
          message: response.data.length === 0 ? 'No results found' : 'Results found'
        };
      }
      
      // If response.data is already an object with data property
      if (response.data.data !== undefined) {
        return {
          data: response.data.data || [],
          total: response.data.total || response.data.data?.length || 0,
          message: response.data.message || (response.data.data?.length === 0 ? 'No results found' : 'Results found')
        };
      }
      
      // Fallback for unexpected response structure
      return { 
        data: [], 
        total: 0, 
        message: 'No results found' 
      };
    } catch (error) {
      console.error('Search API Error:', error);
      throw error;
    }
  },

  // For now, we'll use the main search endpoint for all search types
  // since the backend only has one search endpoint
  searchByLocation: async (location, params = {}) => {
    const response = await api.get('/search', { 
      params: { ...params, region: location } 
    });
    return response.data;
  },

  searchByType: async (type, params = {}) => {
    const response = await api.get('/search', { 
      params: { ...params, type } 
    });
    return response.data;
  },

  advancedSearch: async (searchParams) => {
    const response = await api.get('/search', { params: searchParams });
    return response.data;
  },

  // These endpoints don't exist in the current backend
  getSearchSuggestions: async (query) => {
    // For now, return empty array since this endpoint doesn't exist
    return [];
  },

  getPopularSearches: async () => {
    // For now, return empty array since this endpoint doesn't exist
    return [];
  }
};
