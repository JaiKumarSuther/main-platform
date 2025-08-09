<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useUserProfile } from '@/composables/useUserProfile';

const router = useRouter();
const { logout } = useAuth();
const { deleteAccount } = useUserProfile();

// Safe localStorage access
const getAuthToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const getUserData = () => {
  try {
    return localStorage.getItem('user');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const userJson = getUserData();
const authToken = getAuthToken();

// Check if user is logged in
const isLoggedIn = computed(() => {
  return !!authToken && !!userJson;
});

// Get user data from localStorage as fallback
const localUser = computed(() => {
  try {
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null;
  }
});

const deleteUser = async () => {
  if (!localUser.value?.user_id) {
    console.error("User ID missing — cannot delete user.");
    return;
  }

  if (!confirm('Are you sure you want to delete your account?')) return;

  try {
    await deleteAccount();
    // The deleteAccount function will handle logout and redirect
  } catch (err) {
    console.error('Delete failed:', err);
    alert('Failed to delete account. Please try again.');
  }
};

onMounted(() => {
  // Check if user is logged in, if not redirect to login
  if (!isLoggedIn.value) {
    router.push('/auth/login');
    return;
  }
});
</script>

<template>
  <section class="account-details">
    <h2>My Account</h2>
    
    <!-- Not logged in state -->
    <div v-if="!isLoggedIn" class="not-logged-in">
      <p>You are not logged in. Please log in to view your account details.</p>
      <button @click="router.push('/auth/login')" class="login-btn">Go to Login</button>
    </div>

    <!-- Account details (using localStorage data) -->
    <div v-else class="info-grid">
      <div>
        <label>Full Name</label>
        <p>{{ localUser?.full_name || 'N/A' }}</p>
      </div>
      <div>
        <label>Username</label>
        <p>{{ (localUser?.full_name || '').replace(/\s+/g, '') || 'N/A' }}</p>
      </div>
      <div>
        <label>Email Address</label>
        <p>{{ localUser?.email || 'N/A' }}</p>
      </div>
      <div>
        <label>Phone number</label>
        <p>{{ localUser?.phone_number || 'N/A' }}</p>
      </div>
      <div>
        <label>Role</label>
        <p>{{ localUser?.role || 'N/A' }}</p>
      </div>
    </div>
    
    <div class="actions">
      <button class="logout" @click="logout">Log Out</button>
      <button class="delete" @click="deleteUser">Delete</button>
    </div>
  </section>
</template>

<style scoped>
.not-logged-in {
  text-align: center;
  padding: 40px;
  color: #666;
}

.not-logged-in p {
  margin-bottom: 20px;
}

.login-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.login-btn:hover {
  background: #2980b9;
}
</style>
