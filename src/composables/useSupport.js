import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { supportAPI } from '@/api/support';

export function useSupport() {
  const queryClient = useQueryClient();

  // Get all tickets query (admin only)
  const useAllTickets = (params = {}) => {
    return useQuery({
      queryKey: ['support', 'all', params],
      queryFn: () => supportAPI.getAllTickets(params),
      staleTime: 1 * 60 * 1000, // 1 minute
    });
  };

  // Get ticket by ID query
  const useTicketById = (ticketId) => {
    return useQuery({
      queryKey: ['support', 'detail', ticketId],
      queryFn: () => supportAPI.getTicketById(ticketId),
      enabled: !!ticketId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get user tickets query
  const useUserTickets = () => {
    return useQuery({
      queryKey: ['support', 'user'],
      queryFn: supportAPI.getUserTickets,
      staleTime: 1 * 60 * 1000, // 1 minute
      retry: 1, // Only retry once
      retryDelay: 1000, // Wait 1 second before retry
      refetchOnWindowFocus: false, // Don't refetch when window gains focus
    });
  };

  // Create ticket mutation
  const createTicketMutation = useMutation({
    mutationFn: supportAPI.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support'] });
    }
  });

  // Close ticket mutation
  const closeTicketMutation = useMutation({
    mutationFn: supportAPI.closeTicket,
    onSuccess: (data, ticketId) => {
      queryClient.invalidateQueries({ queryKey: ['support'] });
      queryClient.invalidateQueries({ queryKey: ['support', 'detail', ticketId] });
    }
  });

  // Add admin response mutation
  const addAdminResponseMutation = useMutation({
    mutationFn: ({ ticketId, responseData }) => supportAPI.addAdminResponse(ticketId, responseData),
    onSuccess: (data, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ['support'] });
      queryClient.invalidateQueries({ queryKey: ['support', 'detail', ticketId] });
    }
  });

  return {
    useAllTickets,
    useTicketById,
    useUserTickets,
    createTicketMutation,
    closeTicketMutation,
    addAdminResponseMutation
  };
}
