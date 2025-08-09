import api from './axios';

export const reviewsAPI = {
  // Get all reviews
  getAllReviews: async (params = {}) => {
    const response = await api.get('/reviews', { params });
    return response.data;
  },

  // Get review by ID
  getReviewById: async (reviewId) => {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
  },

  // Get reviews by supplier
  getSupplierReviews: async (supplierId) => {
    const response = await api.get(`/reviews/supplier/${supplierId}`);
    return response.data;
  },

  // Get reviews by listing
  getListingReviews: async (listingId) => {
    const response = await api.get(`/reviews/listing/${listingId}`);
    return response.data;
  },

  // Create new review
  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  // Add reply to review (supplier response)
  addReply: async (reviewId, replyData) => {
    const response = await api.put(`/reviews/${reviewId}/reply`, replyData);
    return response.data;
  }
};
