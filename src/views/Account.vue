<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/axios';

const router = useRouter();
const user = ref({
  full_name: '',
  email: '',
  phone_number: '',
  role: '',
});

const userJson = localStorage.getItem('user');
const userId = userJson ? JSON.parse(userJson).user_id : null;

const fetchUser = async () => {
  try {
    const res = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    user.value = res.data;
  } catch (err) {
    console.error('Failed to fetch user:', err);
  }
};

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  router.push('/auth/login');
};

const deleteUser = async () => {
  if (!userId) {
    console.error("User ID missing — cannot delete user.");
    return;
  }

  if (!confirm('Are you sure you want to delete your account?')) return;

  try {
    await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    logout();
  } catch (err) {
    console.error('Delete failed:', err);
  }
};


onMounted(fetchUser);
</script>

<template>
  <section class="account-details">
    <h2>My Account</h2>
    <div class="info-grid">
      <div>
        <label>Full Name</label>
        <p>{{ user.full_name }}</p>
      </div>
      <div>
        <label>Username</label>
        <p>{{ user.full_name.replace(/\s+/g, '') || 'N/A' }}</p>
      </div>
      <div>
        <label>Email Address</label>
        <p>{{ user.email }}</p>
      </div>
      <div>
        <label>Phone number</label>
        <p>{{ user.phone_number || 'N/A' }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="logout" @click="logout">Log Out</button>
      <button class="delete" @click="deleteUser">Delete</button>
    </div>
  </section>
</template>
