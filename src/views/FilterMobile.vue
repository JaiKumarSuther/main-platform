<script>
import img0 from '@/assets/images/currency-icon.svg'
import img1 from '@/assets/images/dropdown-toggle.svg'

export default {
  data() {
    return {
      showModal: true, // Controls the modal visibility
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<template>
  <div v-if="showModal" class="filter-mobile">
    <div id="filterPopup" class="filter-popup">
      <div class="filter-header">
        <h2>Filters</h2>
       <button id="closeBtn" class="close-btn" @click="closeModal">
          <svg
            width="25"
            height="25"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Circle outline -->
            <circle cx="50" cy="50" r="45" stroke="#5A6783" stroke-width="4" />

            <!-- Cross line 1 -->
            <line
              x1="35"
              y1="35"
              x2="65"
              y2="65"
              stroke="#5A6783"
              stroke-width="4"
              stroke-linecap="round"
            />

            <!-- Cross line 2 -->
            <line
              x1="65"
              y1="35"
              x2="35"
              y2="65"
              stroke="#5A6783"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <div class="filter-sections">
        <div class="filter-section">
          <h3>For</h3>
          <div class="filter-options">
            <button class="option-btn">Local tourists</button>
            <button class="option-btn">International tourists</button>
          </div>
        </div>

        <div class="filter-section">
          <h3>Price</h3>
          <div class="price-inputs">
            <div>
              <label for="">Min. price</label>
              <input type="number" placeholder="$" />
            </div>
            <div>
              <label for="">Max price</label>
              <input type="number" placeholder="$" />
            </div>
          </div>
          <div class="dropdown">
            <img
              :src="img0"
              alt="People Icon"
              class="icon"
            />
            <div class="dropdown-content">
              <label>US Dollar</label>
            </div>
            <img
              :src="img1"
              alt="Dropdown Arrow"
              class="arrow"
              id="peopleDropdownArrow"
            />
          </div>
        </div>

        <div class="filter-section">
          <h3>Type</h3>
          <div class="filter-options">
            <button class="option-btn">Group</button>
            <button class="option-btn">Private</button>
          </div>
        </div>

        <div class="filter-section">
          <h3>Duration</h3>
          <label class="duration-range" for="durationRange">
            <span><strong>Min.</strong> 0 days</span>
            <span> <strong>Max.</strong> 12 days</span></label
          >
          <div>
            <input
              class="min"
              type="range"
              id="durationRange"
              name="durationRange"
              min="0"
              max="12"
              step="1"
            />
          </div>
        </div>

        <div class="filter-section">
          <h3>Theme</h3>
          <div class="filter-options">
            <button class="option-btn">Cultural tours</button>
            <button class="option-btn active">Adventure tours</button>
            <button class="option-btn">City tours</button>
            <button class="option-btn">Food tours</button>
            <button class="option-btn">Safari tours</button>
            <button class="option-btn">Luxury tours</button>
            <button class="option-btn">Wildlife & nature tours</button>
            <button class="option-btn">Photography tours</button>
            <button class="option-btn">Festival tours</button>
          </div>
        </div>

        <div class="filter-section">
          <h3>Departure from</h3>
          <div class="filter-options">
            <button class="option-btn">Karachi</button>
            <button class="option-btn">Islamabad</button>
            <button class="option-btn">Lahore</button>
            <button class="option-btn">Multan</button>
            <button class="option-btn">Faisalabad</button>
            <button class="option-btn">Peshawar</button>
          </div>
        </div>

        <div class="filter-section">
          <h3>Rating</h3>
          <div class="filter-options">
            <button class="option-btn">Atleast 4 stars</button>
            <button class="option-btn">5 star</button>
          </div>
        </div>

        <div class="filter-section">
          <h3>Travelninja Rating</h3>
          <div class="filter-options">
            <button class="option-btn">Atleast 4 stars</button>
            <button class="option-btn">5 star</button>
          </div>
        </div>
      </div>

      <div class="filter-footer">
        <button class="reset-btn">Reset all</button>
        <button class="show-results-btn">Show results</button>
      </div>
    </div>
  </div>
</template>
