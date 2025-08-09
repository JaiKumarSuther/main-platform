import api from './axios';

export const messagesAPI = {
  // Get user conversations
  getUserConversations: async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user?.user_id) {
      throw new Error('No user ID found in localStorage');
    }
    
    const response = await api.get(`/chatting/user/${user.user_id}`);
    console.log('💬 User Conversations API Response:', response.data);
    
    // Transform the data to match the expected format
    const transformedData = (Array.isArray(response.data) ? response.data : []).map((item) => {
      const isSender = item?.sender?.user_id === user.user_id;
      const chatWith = isSender ? item.receiver : item.sender;

      return {
        avatar: '/src/assets/images/auto-generate.jpg',
        name: chatWith?.full_name || 'Unknown',
        receiver_id: chatWith?.user_id,
        booking_id: item.booking?.booking_id,
        last_message: item.message_text,
        time: new Date(item.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };
    });
    
    console.log('💬 Transformed Conversations Data:', transformedData);
    return transformedData;
  },

  // Get messages for a specific booking
  getBookingMessages: async (bookingId) => {
    const response = await api.get(`/messages/booking/${bookingId}`);
    console.log(`💬 Booking Messages ${bookingId} API Response:`, response.data);
    const messages = Array.isArray(response.data) ? response.data : [];
    console.log(`💬 Processed Messages for ${bookingId}:`, messages);
    return messages;
  },

  // Send a message
  sendMessage: async (messageData) => {
    console.log('📤 Sending Message Data:', messageData);
    
    const formData = new FormData();
    formData.append('booking_id', messageData.booking_id);
    formData.append('sender_id', messageData.sender_id);
    formData.append('receiver_id', messageData.receiver_id);
    formData.append('message_text', messageData.message_text);
    
    if (messageData.message_file) {
      formData.append('message_file', messageData.message_file);
    }

    const response = await api.post('/chatting/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('📤 Send Message API Response:', response.data);
    return response.data;
  }
};
