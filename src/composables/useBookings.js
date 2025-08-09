import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { bookingsAPI } from '@/api/bookings';

export function useBookings() {
  const queryClient = useQueryClient();

  // Get all bookings query (admin only)
  const useAllBookings = (params = {}) => {
    return useQuery({
      queryKey: ['bookings', 'all', params],
      queryFn: () => bookingsAPI.getAllBookings(params),
      staleTime: 1 * 60 * 1000, // 1 minute
    });
  };

  // Get booking by ID query
  const useBookingById = (bookingId) => {
    return useQuery({
      queryKey: ['bookings', 'detail', bookingId],
      queryFn: () => bookingsAPI.getBookingById(bookingId),
      enabled: !!bookingId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get customer bookings query
  const useCustomerBookings = () => {
    return useQuery({
      queryKey: ['bookings', 'customer'],
      queryFn: bookingsAPI.getCustomerBookings,
      staleTime: 1 * 60 * 1000, // 1 minute
      retry: 1, // Only retry once
      retryDelay: 1000, // Wait 1 second before retry
      refetchOnWindowFocus: false, // Don't refetch when window gains focus
    });
  };

  // Get partner bookings query
  const usePartnerBookings = () => {
    return useQuery({
      queryKey: ['bookings', 'partner'],
      queryFn: bookingsAPI.getPartnerBookings,
      staleTime: 1 * 60 * 1000, // 1 minute
    });
  };

  // Get cancelled bookings query
  const useCancelledBookings = () => {
    return useQuery({
      queryKey: ['bookings', 'cancelled'],
      queryFn: bookingsAPI.getCancelledBookings,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: bookingsAPI.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });

  // Update booking status mutation
  const updateBookingStatusMutation = useMutation({
    mutationFn: ({ bookingId, status }) => bookingsAPI.updateBookingStatus(bookingId, status),
    onSuccess: (data, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['bookings', 'detail', bookingId] });
    }
  });

  return {
    useAllBookings,
    useBookingById,
    useCustomerBookings,
    usePartnerBookings,
    useCancelledBookings,
    createBookingMutation,
    updateBookingStatusMutation
  };
}
