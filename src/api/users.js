import api from './axios';

export const usersAPI = {
  // Get current user profile
  getCurrentUser: async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user || !user.user_id) {
      throw new Error('No user ID found in localStorage');
    }
    
    const response = await api.get(`/users/${user.user_id}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user || !user.user_id) {
      throw new Error('No user ID found in localStorage');
    }
    
    const response = await api.put(`/users/${user.user_id}`, userData);
    return response.data;
  },

  // Update bank details
  updateBankDetails: async (bankData) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user || !user.user_id) {
      throw new Error('No user ID found in localStorage');
    }
    
    const response = await api.put(`/users/bank/${user.user_id}`, { bank_account: bankData });
    return response.data;
  },

  // Update profile image
  updateProfileImage: async (imageUrl) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user || !user.user_id) {
      throw new Error('No user ID found in localStorage');
    }
    
    const response = await api.put(`/users/profile-image/${user.user_id}`, { profile_photo: imageUrl });
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user || !user.user_id) {
      throw new Error('No user ID found in localStorage');
    }
    
    const response = await api.put(`/users/${user.user_id}`, passwordData);
    return response.data;
  },

  // Delete user account
  deleteAccount: async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user || !user.user_id) {
      throw new Error('No user ID found in localStorage');
    }
    
    const response = await api.delete(`/users/${user.user_id}`);
    return response.data;
  },

  // Get user's saved items (wishlist)
  getSavedItems: async () => {
    // This endpoint doesn't exist yet, so we'll return a placeholder
    // TODO: Implement saved items functionality in backend
    return {
      items: [],
      message: 'Saved items functionality coming soon'
    };
  },

  // Add item to saved list
  addToSaved: async (itemId, itemType) => {
    // This endpoint doesn't exist yet, so we'll return a placeholder
    // TODO: Implement saved items functionality in backend
    return {
      message: 'Item added to saved list (placeholder)'
    };
  },

  // Remove item from saved list
  removeFromSaved: async (itemId) => {
    // This endpoint doesn't exist yet, so we'll return a placeholder
    // TODO: Implement saved items functionality in backend
    return {
      message: 'Item removed from saved list (placeholder)'
    };
  }
};
