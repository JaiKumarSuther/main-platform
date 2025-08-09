import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { messagesAPI } from '@/api/messages';

export function useMessages() {
  const queryClient = useQueryClient();

  // Get user conversations
  const useUserConversations = () => {
    return useQuery({
      queryKey: ['messages', 'conversations'],
      queryFn: messagesAPI.getUserConversations,
      staleTime: 1 * 60 * 1000, // 1 minute
      enabled: !!localStorage.getItem('authToken'),
      retry: 1, // Only retry once
      retryDelay: 1000, // Wait 1 second before retry
      refetchOnWindowFocus: false, // Don't refetch when window gains focus
    });
  };

  // Get messages for a specific booking
  const useBookingMessages = (bookingId) => {
    return useQuery({
      queryKey: ['messages', 'booking', bookingId],
      queryFn: () => messagesAPI.getBookingMessages(bookingId),
      enabled: !!bookingId && !!localStorage.getItem('authToken'),
      staleTime: 30 * 1000, // 30 seconds
    });
  };

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: messagesAPI.sendMessage,
    onSuccess: (data, variables) => {
      // Invalidate and refetch messages for the specific booking
      queryClient.invalidateQueries({ 
        queryKey: ['messages', 'booking', variables.booking_id] 
      });
      // Also invalidate conversations to update last message
      queryClient.invalidateQueries({ 
        queryKey: ['messages', 'conversations'] 
      });
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
    }
  });

  return {
    useUserConversations,
    useBookingMessages,
    sendMessageMutation
  };
}
