import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { reviewsAPI } from '@/api/reviews';

export function useReviews() {
  const queryClient = useQueryClient();

  // Get all reviews query
  const useAllReviews = (params = {}) => {
    return useQuery({
      queryKey: ['reviews', 'all', params],
      queryFn: () => reviewsAPI.getAllReviews(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get review by ID query
  const useReviewById = (reviewId) => {
    return useQuery({
      queryKey: ['reviews', 'detail', reviewId],
      queryFn: () => reviewsAPI.getReviewById(reviewId),
      enabled: !!reviewId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  // Get supplier reviews query
  const useSupplierReviews = (supplierId) => {
    return useQuery({
      queryKey: ['reviews', 'supplier', supplierId],
      queryFn: () => reviewsAPI.getSupplierReviews(supplierId),
      enabled: !!supplierId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get listing reviews query
  const useListingReviews = (listingId) => {
    return useQuery({
      queryKey: ['reviews', 'listing', listingId],
      queryFn: () => reviewsAPI.getListingReviews(listingId),
      enabled: !!listingId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create review mutation
  const createReviewMutation = useMutation({
    mutationFn: reviewsAPI.createReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      // Invalidate specific listing/supplier reviews if available
      if (data.listingId) {
        queryClient.invalidateQueries({ queryKey: ['reviews', 'listing', data.listingId] });
      }
      if (data.supplierId) {
        queryClient.invalidateQueries({ queryKey: ['reviews', 'supplier', data.supplierId] });
      }
    }
  });

  // Update review mutation
  const updateReviewMutation = useMutation({
    mutationFn: ({ reviewId, reviewData }) => reviewsAPI.updateReview(reviewId, reviewData),
    onSuccess: (data, { reviewId }) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'detail', reviewId] });
    }
  });

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: reviewsAPI.deleteReview,
    onSuccess: (data, reviewId) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'detail', reviewId] });
    }
  });

  // Add reply mutation
  const addReplyMutation = useMutation({
    mutationFn: ({ reviewId, replyData }) => reviewsAPI.addReply(reviewId, replyData),
    onSuccess: (data, { reviewId }) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'detail', reviewId] });
    }
  });

  return {
    useAllReviews,
    useReviewById,
    useSupplierReviews,
    useListingReviews,
    createReviewMutation,
    updateReviewMutation,
    deleteReviewMutation,
    addReplyMutation
  };
}
