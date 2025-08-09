import api from './axios';

export const supportAPI = {
  // Get all tickets (admin)
  getAllTickets: async () => {
    const response = await api.get('/support');
    console.log('🎫 All Support Tickets API Response:', response.data);
    return response.data;
  },

  // Get user tickets
  getUserTickets: async () => {
    const response = await api.get('/support/my-tickets');
    console.log('👤 User Support Tickets API Response:', response.data);
    return response.data;
  },

  // Get ticket by ID
  getTicketById: async (ticketId) => {
    const response = await api.get(`/support/${ticketId}`);
    console.log(`🎫 Support Ticket ${ticketId} API Response:`, response.data);
    return response.data;
  },

  // Create new ticket
  createTicket: async (ticketData) => {
    const response = await api.post('/support', ticketData);
    console.log('➕ Create Support Ticket API Response:', response.data);
    return response.data;
  },

  // Add admin response to ticket
  addAdminResponse: async (ticketId, responseData) => {
    const response = await api.patch(`/support/${ticketId}/response`, responseData);
    console.log(`💬 Add Admin Response ${ticketId} API Response:`, response.data);
    return response.data;
  },

  // Close ticket
  closeTicket: async (ticketId) => {
    const response = await api.patch(`/support/${ticketId}/close`);
    console.log(`🔒 Close Ticket ${ticketId} API Response:`, response.data);
    return response.data;
  }
};
