<script setup>
import img0 from '@/assets/images/date-icon-select-details.svg'
import img1 from '@/assets/images/sort-by-icon.svg'

import RoomCard from './RoomCard.vue'

const rooms = [
  {
    image: '@/assets/images/hotel1.jpg',
    title: 'Deluxe Room',
    sleeps: 'Sleeps 3',
    bedType: '1 Single Bed · 1 King Bed',
    roomSize: '159 sq ft',
    cancellationDate: '6th May',
    price: 'PKR 4840',
    nights: '2',
    note: 'Breakfast included'
  },
  {
    image: '@/assets/images/avatar.png',
    title: 'Deluxe Room',
    sleeps: 'Sleeps 3',
    bedType: '1 Single Bed · 1 King Bed',
    roomSize: '159 sq ft',
    cancellationDate: '6th May',
    price: 'PKR 4840',
    nights: '2',
    note: 'Breakfast included'
  },
  {
    image: '@/assets/images/avatar.png',
    title: 'Deluxe Room',
    sleeps: 'Sleeps 3',
    bedType: '1 Single Bed · 1 King Bed',
    roomSize: '159 sq ft',
    cancellationDate: '6th May',
    price: 'PKR 4840',
    nights: '2',
    note: 'Breakfast included'
  },
  {
    image: '@/assets/images/avatar.png',
    title: 'Deluxe Room',
    sleeps: 'Sleeps 3',
    bedType: '1 Single Bed · 1 King Bed',
    roomSize: '159 sq ft',
    cancellationDate: '6th May',
    price: 'PKR 4840',
    nights: '2',
    note: 'Breakfast included'
  },
]
</script>

<template>
  <div class="select-room">
    <h2>Choose your room</h2>

    <div class="select-room-dropdown">
      <div class="left-dropdown">
        <div class="dropdown check">
          <img :src="img0" alt="Date Icon" class="icon" />
          <div class="dropdown-content">
            <label>Dates</label>
            <span>29 Aug - 2 Sep</span>
          </div>
        </div>
      </div>
      <div class="sort-container">
        <p>{{ rooms.length }} rooms available</p>
        <button id="sortBtn" class="border-button">
          <img :src="img1" alt="" /> Sort by
        </button>
      </div>
    </div>

    <div class="room-list">
      <RoomCard
        v-for="(room, index) in rooms"
        :key="index"
        v-bind="room"
      />
    </div>
  </div>
</template>
