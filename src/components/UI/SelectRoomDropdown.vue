<template>
  <div class="select-room-dropdown">
    <div class="left-dropdown">
      <div class="dropdown check">
        <img :src="img0" alt="Calendar" class="icon" />
        <div class="dropdown-content">
          <label>Dates</label>
          <span>29 Aug - 2 Sep</span>
        </div>
      </div>
    </div>
    <div class="sort-container">
      <p>3 rooms available</p>
      <button class="border-button">
        <img :src="img1" alt="Sort" />Sort by
      </button>
    </div>
  </div>
</template>
