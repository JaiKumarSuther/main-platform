import api from './axios';

export const listingsAPI = {
  // Get all listings (admin only)
  getAllListings: async (params = {}) => {
    const response = await api.get('/listings', { params });
    return response.data;
  },

  // Get listing by ID
  getListingById: async (listingId) => {
    const response = await api.get(`/listings/${listingId}`);
    return response.data;
  },

  // Get supplier listings
  getSupplierListings: async () => {
    const response = await api.get('/listings/my-listings');
    return response.data;
  },

  // Create new listing
  createListing: async (listingData) => {
    const response = await api.post('/listings', listingData);
    return response.data;
  },

  // Update listing
  updateListing: async (listingId, listingData) => {
    const response = await api.put(`/listings/${listingId}`, listingData);
    return response.data;
  },

  // Delete listing
  deleteListing: async (listingId) => {
    const response = await api.delete(`/listings/${listingId}`);
    return response.data;
  },

  // Approve listing (admin only)
  approveListing: async (listingId) => {
    const response = await api.patch(`/listings/${listingId}/approve`);
    return response.data;
  },

  // Reject listing (admin only)
  rejectListing: async (listingId, reason) => {
    const response = await api.patch(`/listings/${listingId}/reject`, { reason });
    return response.data;
  }
};
