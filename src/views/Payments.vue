<template>
  <div class="payments-container">
    <h2>My payments & refunds</h2>

    <div class="filter-bar">
      <div class="tabs">
        <button class="tab active">Payments</button>
        <button class="tab">Refunds</button>
      </div>
    </div>

    <div class="Payments-table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payout in payouts" :key="payout.payout_id">
            <td>{{ new Date(payout.payout_date).toLocaleDateString('en-GB') }}</td>
            <td>{{ payout.booking_id }}</td>
            <td class="amount">{{ Math.round(payout.final_amount).toLocaleString() }}</td>
            <td class="status">{{ payout.payout_status }}</td>
          </tr>
          <tr v-if="payouts.length === 0">
            <td colspan="4" class="text-center">No payouts found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/axios';

const payouts = ref([]);

const fetchPayouts = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await api.get('/payouts/supplier', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    payouts.value = res.data;
    console.log('Fetched payouts:', res.data); // ✅ Console log
  } catch (err) {
    console.error('Failed to fetch payouts:', err);
  }
};

onMounted(fetchPayouts);
</script>

<style scoped>
.text-center {
  text-align: center;
  padding: 1rem 0;
  color: #888;
}
</style>
