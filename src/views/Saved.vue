<script setup lang="ts">
import img0 from '@/assets/images/mywishlist.svg'
import img1 from '@/assets/images/10927.jpg'
import img2 from '@/assets/images/26240.jpg'

import { ref, onMounted } from 'vue';
import { useUserProfile } from '@/composables/useUserProfile';

const { getSavedItems, removeFromSaved } = useUserProfile();
const savedItems = ref([]);
const loading = ref(false);

const loadSavedItems = async () => {
  loading.value = true;
  try {
    const result = await getSavedItems();
    savedItems.value = result.items || [];
  } catch (error) {
    console.error('Failed to load saved items:', error);
    // On error, show empty state instead of error message
    savedItems.value = [];
  } finally {
    loading.value = false;
  }
};

const handleRemoveItem = async (itemId) => {
  try {
    await removeFromSaved(itemId);
    // Reload the list
    await loadSavedItems();
  } catch (error) {
    console.error('Failed to remove item:', error);
    alert('Failed to remove item from saved list');
  }
};

onMounted(() => {
  loadSavedItems();
});
</script>

<template>
  <div class="wishlist-container">
    <h2>My Saved</h2>

    <!-- Loading state - Only show if no data exists yet -->
    <div v-if="loading && savedItems.length === 0" class="loading">
      <p>Loading saved items...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!loading && savedItems.length === 0" class="empty-state">
      <p>No saved items yet. Start exploring and save your favorites!</p>
    </div>

    <!-- Saved items -->
    <div v-else>
      <div 
        v-for="item in savedItems" 
        :key="item.id" 
        class="wishlist-card"
      >
        <div class="details">
          <div class="name">
            <img :src="item.image || '@/assets/images/10927.jpg'" alt="" />
            <span class="name">{{ item.name || 'Item Name' }}</span>
          </div>
          <img 
            :src="img0" 
            alt="" 
            @click="handleRemoveItem(item.id)"
            style="cursor: pointer;"
          />
        </div>
      </div>
    </div>

    <!-- Fallback static content for now -->
    <div v-if="!loading && savedItems.length === 0" class="wishlist-card">
      <div class="details">
        <div class="name">
          <img :src="img1" alt="" />
          <span class="name"
            >14 Day Full Board Expedition to the K2 Base Camp</span
          >
        </div>
        <img :src="img0" alt="" />
      </div>
    </div>

    <div v-if="!loading && savedItems.length === 0" class="wishlist-card">
      <div class="details">
        <div class="name">
          <img :src="img2" alt="" />
          <span class="name">Shangrila Resort</span>
        </div>
        <img :src="img0" alt="" />
      </div>
    </div>
  </div>
</template>
