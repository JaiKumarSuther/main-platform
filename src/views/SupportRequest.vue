<template> 
  <div class="mysupportReq-container">
    <h2>My Support Tickets</h2>

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
          <img src="@/assets/images/sort-by-icon.svg" alt="" />
        </span>
        sort by
      </button>
    </div>

    <div
      v-for="ticket in filteredTickets"
      :key="ticket.ticket_id"
      class="supportReq-card"
    >
      <div class="details">
        <div class="label" :class="ticket.status.toLowerCase()">
          {{ ticket.status }}
        </div>
        <span class="name">{{ ticket.subject }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api/axios'

const tickets = ref([])
const activeTab = ref('open') // Tracks which tab is selected

const fetchTickets = async () => {
  try {
    const token = localStorage.getItem('authToken')
    const response = await api.get('/support/my-tickets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    tickets.value = response.data
  } catch (error) {
    console.error('Error fetching support tickets:', error)
  }
}

const filteredTickets = computed(() =>
  tickets.value.filter((ticket) =>
    activeTab.value === 'open'
      ? ticket.status.toLowerCase() === 'open'
      : ticket.status.toLowerCase() === 'closed'
  )
)

onMounted(fetchTickets)
</script>
