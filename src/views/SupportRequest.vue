<template> 
  <div class="mysupportReq-container">
    <h2>My Support Tickets</h2>



    <!-- Loading state - Only show if no data exists yet -->
    <div v-if="userTicketsQuery.isLoading && !userTicketsQuery.data" class="loading-state">
      <div class="loading-spinner"></div>
      <h3>Loading Your Support Tickets</h3>
      <p>Please wait while we fetch your support ticket information...</p>
    </div>

    <!-- Error state - Show as empty state instead -->
    <div v-else-if="userTicketsQuery.isError" class="empty-state">
      <div class="empty-state-icon">🎫</div>
      <h3>No Support Tickets Found</h3>
      <p>You haven't created any support tickets yet. If you need help, feel free to create a new ticket!</p>
    </div>

    <!-- Support tickets interface - Show when not loading or when data exists -->
    <div v-else-if="!userTicketsQuery.isLoading || userTicketsQuery.data">
      <!-- Filter bar - Always visible -->
      <div class="filter-bar">
        <div class="tabs">
          <button
            class="tab"
            :class="{ active: activeTab === 'open' }"
            @click="activeTab = 'open'"
          >
            Open
          </button>
          <button
            class="tab"
            :class="{ active: activeTab === 'closed' }"
            @click="activeTab = 'closed'"
          >
            Closed
          </button>
        </div>
        <button class="sort-btn">
          <span class="icon">
            <img :src="img0" alt="" />
          </span>
          sort by
        </button>
      </div>

      <!-- Empty state - No tickets at all -->
      <div v-if="!userTicketsQuery.data || userTicketsQuery.data.length === 0" class="empty-state">
        <div class="empty-state-icon">🎫</div>
        <h3>No Support Tickets Found</h3>
        <p>You haven't created any support tickets yet. If you need help, feel free to create a new ticket!</p>
      </div>

      <!-- Support tickets list -->
      <div v-else>
        <!-- Filtered tickets -->
        <div v-if="filteredTickets.length === 0" class="no-filtered-tickets">
          <div class="empty-state-icon">🔍</div>
          <h4>No {{ activeTab }} tickets found</h4>
          <p>You don't have any {{ activeTab }} support tickets at the moment.</p>
        </div>

        <div v-else class="support-tickets-list">
          <div
            v-for="ticket in filteredTickets"
            :key="ticket.ticket_id"
            class="supportReq-card"
            @click="viewTicket(ticket.ticket_id)"
          >
            <div class="details">
              <div class="label" :class="ticket.status.toLowerCase()">
                {{ ticket.status }}
              </div>
              <span class="name">{{ ticket.subject }}</span>
              <span class="date">{{ formatDate(ticket.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img0 from '@/assets/images/sort-by-icon.svg'

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSupport } from '@/composables/useSupport'

const router = useRouter()
const activeTab = ref('open') // Tracks which tab is selected

const { useUserTickets } = useSupport()

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

// Check if user is logged in
const isLoggedIn = computed(() => {
  return !!getAuthToken() && !!getUserData();
});

// Get user tickets
const userTicketsQuery = useUserTickets()

const filteredTickets = computed(() => {
  if (!userTicketsQuery.data) return []
  
  return userTicketsQuery.data.filter((ticket) =>
    activeTab.value === 'open'
      ? ticket.status.toLowerCase() === 'open'
      : ticket.status.toLowerCase() === 'closed'
  )
})

const viewTicket = (ticketId) => {
  router.push(`/support/ticket/${ticketId}`)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  // Component mounted successfully
});
</script>

<style scoped>
.mysupportReq-container {
  padding: 20px;
}

.mysupportReq-container h2 {
  margin-bottom: 30px;
  color: #2c3e50;
}

.loading-state, .error-state, .empty-state, .no-filtered-tickets {
  text-align: center;
  padding: 60px 40px;
  color: #666;
  max-width: 500px;
  margin: 0 auto;
}

.empty-state-icon, .error-state-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.loading-state h3, .error-state h3, .empty-state h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 24px;
}

.loading-state p, .error-state p, .empty-state p {
  margin-bottom: 25px;
  font-size: 16px;
  line-height: 1.5;
}

.no-filtered-tickets h4 {
  color: #2c3e50;
  margin: 15px 0 10px 0;
  font-size: 18px;
}

.no-filtered-tickets p {
  font-size: 14px;
  line-height: 1.4;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn, .create-ticket-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-btn:hover, .create-ticket-btn:hover {
  background: #2980b9;
}

.error-details {
  color: #e74c3c;
  font-size: 14px;
  margin: 15px 0;
  padding: 10px;
  background: #fdf2f2;
  border-radius: 4px;
  border-left: 4px solid #e74c3c;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.tabs {
  display: flex;
  gap: 10px;
}

.tab {
  padding: 8px 16px;
  border: 1px solid #e1e8ed;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e1e8ed;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sort-btn:hover {
  background: #f8f9fa;
}

.support-tickets-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.supportReq-card {
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.supportReq-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.details {
  display: flex;
  align-items: center;
  gap: 15px;
}

.label {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.label.open {
  background: #d4edda;
  color: #155724;
}

.label.closed {
  background: #f8d7da;
  color: #721c24;
}

.name {
  flex: 1;
  font-weight: 500;
  color: #2c3e50;
}

.date {
  font-size: 12px;
  color: #666;
}

@media (max-width: 768px) {
  .loading-state, .error-state, .empty-state, .no-filtered-tickets {
    padding: 40px 20px;
  }
  
  .filter-bar {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .tabs {
    justify-content: center;
  }
  
  .details {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
