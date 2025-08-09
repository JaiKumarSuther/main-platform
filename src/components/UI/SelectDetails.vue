<script setup>
import img0 from '@/assets/images/date-icon-select-details.svg'
import img1 from '@/assets/images/dropdown-toggle.svg'
import img2 from '@/assets/images/pickup-dropoff-time-icon.svg'
import img3 from '@/assets/images/free-cancellation-icon.svg'

const props = defineProps({
  withDriverLabel: { type: String, default: 'With Driver' },
  withoutDriverLabel: { type: String, default: 'Without Driver' },
  selectedDate: String,
  pickupTime: String,
  dropoffTime: String,
  addOns: Array, // [{ label: 'Passenger Helmet', price: 'Rs 1,200' }, ...]
  rentalSummary: Object, // { days: 8, total: 'Rs 86,400', breakdown: [{ label, amount }] }
  cancellationNote: String,
  cancellationDeadline: String,
});
</script>

<template>
  <div class="booking">
    <h2>Select details</h2>

    <!-- Driver Toggle -->
    <div class="driver">
      <div class="with-driver">{{ withDriverLabel }}</div>
      <div class="without-driver">{{ withoutDriverLabel }}</div>
    </div>

    <!-- Date Selection -->
    <div class="dropdown-container">
      <div class="dropdown">
        <img :src="img0" alt="Calendar Icon" class="icon" />
        <div class="dropdown-content">
          <label>Date</label>
          <span>{{ selectedDate }}</span>
        </div>
        <img :src="img1" alt="Dropdown Arrow" class="arrow" />
      </div>

      <!-- Pickup & Dropoff -->
      <div class="pick-and-drop">
        <div class="dropdown">
          <img :src="img2" alt="Pickup" class="icon" />
          <div class="dropdown-content">
            <label>Pickup</label>
            <span>{{ pickupTime }}</span>
          </div>
          <img :src="img1" alt="Arrow" class="arrow" />
        </div>
        <div class="dropdown">
          <img :src="img2" alt="Dropoff" class="icon" />
          <div class="dropdown-content">
            <label>Dropoff</label>
            <span>{{ dropoffTime }}</span>
          </div>
          <img :src="img1" alt="Arrow" class="arrow" />
        </div>
      </div>
    </div>

    <!-- Add Ons -->
    <div class="addons">
      <h3>Add Ons</h3>
      <label v-for="(addOn, index) in addOns" :key="index">
        <div><input type="checkbox" /> {{ addOn.label }}</div>
        <span class="price">+ {{ addOn.price }} <small>/day</small></span>
      </label>
    </div>

    <!-- Summary -->
    <div class="price-summary">
      <h3>Summary</h3>
      <p class="date">{{ rentalSummary.days }} Days Rental</p>
      <h2 class="total-price">{{ rentalSummary.total }}</h2>

      <div class="breakdown">
        <p v-for="(item, idx) in rentalSummary.breakdown" :key="idx">
          {{ item.label }} <span class="amount">{{ item.amount }}</span>
        </p>
      </div>

      <p class="cancellation">
        <img :src="img3" alt="" />
        {{ cancellationNote }} <span class="highlight">{{ cancellationDeadline }}</span>
      </p>

      <div class="checkout-btns">
        <button class="checkout">Proceed to checkout</button>
      </div>
    </div>
  </div>
</template>
