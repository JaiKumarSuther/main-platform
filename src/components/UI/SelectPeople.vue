<template>
  <div id="peopleDropdownContainer" class="dropdown">
    <img :src="icon" alt="People Icon" class="icon" />
    <div class="dropdown-content">
      <label>{{ label }}</label>
      <span>{{ placeholder }}</span>
    </div>
    <img :src="toggleIcon" alt="Dropdown Arrow" class="arrow" />

    <!-- Dropdown Menu -->
    <div class="people-container">
      <div class="dropdown-menu">
        <div
          class="dropdown-item"
          v-for="(group, index) in groups"
          :key="index"
        >
          <p>{{ group.title }} <span>{{ group.ageRange }}</span></p>
          <div class="counter">
            <p class="increase" @click="group.count++">
              <img :src="plusIcon" alt="" />
            </p>
            <span class="count">{{ group.count }}</span>
            <p class="decrease" @click="group.count = Math.max(0, group.count - 1)">
              <img :src="minusIcon" alt="" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  toggleIcon: String,
  plusIcon: String,
  minusIcon: String,
  label: String,
  placeholder: String,
  groups: Array
});
</script>