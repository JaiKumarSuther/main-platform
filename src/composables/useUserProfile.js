import { usersAPI } from '@/api/users';

export function useUserProfile() {
  // Get current user profile
  const getCurrentUser = async () => {
    try {
      return await usersAPI.getCurrentUser();
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const result = await usersAPI.updateProfile(userData);
      // Update localStorage with new data
      localStorage.setItem('user', JSON.stringify(result));
      return result;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      return await usersAPI.changePassword(passwordData);
    } catch (error) {
      console.error('Failed to change password:', error);
      throw error;
    }
  };

  // Delete account
  const deleteAccount = async () => {
    try {
      const result = await usersAPI.deleteAccount();
      // Clear localStorage and redirect
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
      return result;
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error;
    }
  };

  // Get saved items
  const getSavedItems = async () => {
    try {
      return await usersAPI.getSavedItems();
    } catch (error) {
      console.error('Failed to get saved items:', error);
      throw error;
    }
  };

  // Add to saved
  const addToSaved = async (itemId, itemType) => {
    try {
      return await usersAPI.addToSaved(itemId, itemType);
    } catch (error) {
      console.error('Failed to add to saved:', error);
      throw error;
    }
  };

  // Remove from saved
  const removeFromSaved = async (itemId) => {
    try {
      return await usersAPI.removeFromSaved(itemId);
    } catch (error) {
      console.error('Failed to remove from saved:', error);
      throw error;
    }
  };

  return {
    getCurrentUser,
    updateProfile,
    changePassword,
    deleteAccount,
    getSavedItems,
    addToSaved,
    removeFromSaved
  };
}
