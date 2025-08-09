import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { listingsAPI } from '@/api/listings';

export function useListings() {
  const queryClient = useQueryClient();

  // Get all listings query (admin only)
  const useAllListings = (params = {}) => {
    return useQuery({
      queryKey: ['listings', 'all', params],
      queryFn: () => listingsAPI.getAllListings(params),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get listing by ID query
  const useListingById = (listingId) => {
    return useQuery({
      queryKey: ['listings', 'detail', listingId],
      queryFn: () => listingsAPI.getListingById(listingId),
      enabled: !!listingId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get supplier listings query
  const useSupplierListings = () => {
    return useQuery({
      queryKey: ['listings', 'supplier'],
      queryFn: listingsAPI.getSupplierListings,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Create listing mutation
  const createListingMutation = useMutation({
    mutationFn: listingsAPI.createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    }
  });

  // Update listing mutation
  const updateListingMutation = useMutation({
    mutationFn: ({ listingId, listingData }) => listingsAPI.updateListing(listingId, listingData),
    onSuccess: (data, { listingId }) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listings', 'detail', listingId] });
    }
  });

  // Delete listing mutation
  const deleteListingMutation = useMutation({
    mutationFn: listingsAPI.deleteListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    }
  });

  // Approve listing mutation (admin only)
  const approveListingMutation = useMutation({
    mutationFn: listingsAPI.approveListing,
    onSuccess: (data, listingId) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listings', 'detail', listingId] });
    }
  });

  // Reject listing mutation (admin only)
  const rejectListingMutation = useMutation({
    mutationFn: ({ listingId, reason }) => listingsAPI.rejectListing(listingId, reason),
    onSuccess: (data, { listingId }) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listings', 'detail', listingId] });
    }
  });

  return {
    useAllListings,
    useListingById,
    useSupplierListings,
    createListingMutation,
    updateListingMutation,
    deleteListingMutation,
    approveListingMutation,
    rejectListingMutation
  };
}
