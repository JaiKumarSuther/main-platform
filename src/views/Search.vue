<template>
  <main>
    <div class="search-result-container">
      <section class="tours">
        <!-- Header -->
        <div class="search-result-header">
          <div class="content">
            <h2>{{ searchQuery || 'Search Results' }}</h2>
            <div class="tours-available">
              {{ getCountText }}
            </div>
            <div class="trusted-operator">
              <img :src="img2" alt="" />Only trusted operators
            </div>
          </div>
          
          <!-- Filter and Sort Buttons -->
          <div class="filter-sort">
            <button class="border-button" @click="showFilters = !showFilters">
              <img :src="img5" alt="" />Filters
            </button>
            <button class="border-button" @click="showSort = !showSort">
              <img :src="img6" alt="" />Sort by
            </button>
          </div>
        </div>

        <!-- Filter Popup -->
        <div v-if="showFilters" class="filter-popup">
          <div class="filter-header">
            <h2>Filters</h2>
            <button class="close-btn" @click="showFilters = false">×</button>
          </div>
          
          <div class="filter-sections">
            <!-- Tourist Type -->
            <div class="filter-section">
              <h3>For</h3>
              <div class="filter-options">
                <button 
                  class="option-btn" 
                  :class="{ active: filters.touristType === 'local' }"
                  @click="updateFilter('touristType', 'local')"
                >
                  Local tourists
                </button>
                <button 
                  class="option-btn"
                  :class="{ active: filters.touristType === 'international' }"
                  @click="updateFilter('touristType', 'international')"
                >
                  International tourists
                </button>
              </div>
            </div>

            <!-- Price Range -->
            <div class="filter-section">
              <h3>Price</h3>
              <div class="price-inputs">
                <div>
                  <label>Min. price</label>
                  <input 
                    type="number" 
                    placeholder="$" 
                    v-model="filters.minPrice"
                  />
                </div>
                <div>
                  <label>Max price</label>
                  <input 
                    type="number" 
                    placeholder="$" 
                    v-model="filters.maxPrice"
                  />
                </div>
              </div>
            </div>

            <!-- Tour Type -->
            <div class="filter-section">
              <h3>Type</h3>
              <div class="filter-options">
                <button 
                  class="option-btn"
                  :class="{ active: filters.type === 'group' }"
                  @click="updateFilter('type', 'group')"
                >
                  Group
                </button>
                <button 
                  class="option-btn"
                  :class="{ active: filters.type === 'private' }"
                  @click="updateFilter('type', 'private')"
                >
                  Private
                </button>
              </div>
            </div>

            <!-- Theme -->
            <div class="filter-section">
              <h3>Theme</h3>
              <div class="filter-options">
                <button 
                  v-for="theme in themes" 
                  :key="theme"
                  class="option-btn"
                  :class="{ active: filters.theme === theme }"
                  @click="updateFilter('theme', theme)"
                >
                  {{ theme }}
                </button>
              </div>
            </div>
          </div>

          <div class="filter-footer">
            <button class="reset-btn" @click="resetFilters">Reset all</button>
            <button class="show-results-btn" @click="applyFilters">Show results</button>
          </div>
        </div>

        <!-- Sort Popup -->
        <div v-if="showSort" class="filter-popup">
          <div class="filter-header">
            <h2>Sort by</h2>
            <button class="close-btn" @click="showSort = false">×</button>
          </div>
          
          <div class="filter-section">
            <div class="sort-options">
              <label>
                <input type="radio" name="sort" value="best" v-model="sortBy" @change="applySort" />
                Best match
              </label>
              <label>
                <input type="radio" name="sort" value="low-to-high" v-model="sortBy" @change="applySort" />
                Price - Low to high
              </label>
              <label>
                <input type="radio" name="sort" value="high-to-low" v-model="sortBy" @change="applySort" />
                Price - High to low
              </label>
              <label>
                <input type="radio" name="sort" value="rating" v-model="sortBy" @change="applySort" />
                Highest rated operator
              </label>
              <label>
                <input type="radio" name="sort" value="newest" v-model="sortBy" @change="applySort" />
                Newest first
              </label>
            </div>
          </div>
        </div>

        <!-- Debug info (remove in production) -->
        <div v-if="false" style="background: #f0f0f0; padding: 10px; margin: 10px; font-size: 12px;">
          <p>Debug Info:</p>
          <p>isLoading: {{ searchResults.isLoading }}</p>
          <p>isFetching: {{ searchResults.isFetching }}</p>
          <p>isError: {{ searchResults.isError }}</p>
          <p>isSuccess: {{ searchResults.isSuccess }}</p>
          <p>data: {{ JSON.stringify(searchResults.data) }}</p>
        </div>

        <!-- Loading state - simplified condition -->
        <div v-if="searchResults.isLoading || searchResults.isFetching" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Searching...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="searchResults.isError" class="error-state">
          <div class="error-content">
            <p>Error loading search results. Please try again.</p>
            <button @click="retrySearch" class="retry-btn">Retry</button>
          </div>
        </div>

        <!-- Search results with data -->
        <div v-else-if="searchResults.isSuccess && searchResults?.data?.data && searchResults.data.data.length > 0" class="search-result-list">
          <div 
            v-for="listing in searchResults.data.data" 
            :key="listing?.id || Math.random()"
            class="listing-card"
            @click="viewListing(listing?.id)"
            v-if="listing?.id"
          >
            <div class="listing-image">
              <img :src="listing?.images?.[0] || '@/assets/images/default-listing.jpg'" :alt="listing?.title || 'Listing'" />
              <span class="wishlist">
                <img :src="img7" alt="Wishlist" />
              </span>
            </div>
            <div class="listing-info">
              <span v-if="listing?.type" class="tag">{{ listing.type }}</span>
              <span v-if="listing?.touristType" class="tag">{{ listing.touristType }}</span>
              <h3>{{ listing?.title || 'Untitled Listing' }}</h3>
              
              <div v-if="listing?.location" class="info">
                <div class="info-content">
                  <img :src="img8" alt="" />
                  <p>Location</p>
                </div>
                <span>{{ listing.location }}</span>
              </div>
              
              <div v-if="listing?.duration" class="info">
                <div class="info-content">
                  <img :src="img9" alt="" />
                  <p>Duration</p>
                </div>
                <span>{{ listing.duration }}</span>
              </div>
              
              <div class="listing-provider">
                By <span>{{ listing?.supplier?.name || 'Unknown Provider' }}</span>
                <div class="rating-badge">
                  <span class="rating-icon">
                    <img :src="img11" alt="" />
                  </span>
                  <span class="rating-score">{{ listing?.rating || 'N/A' }}</span>
                </div>
              </div>
              
              <p class="price">From: <span>{{ formatPrice(listing?.price || 0) }}</span></p>
            </div>
          </div>
        </div>

        <!-- No results state - fallback for all other cases -->
        <div v-else class="no-results">
          <div class="no-results-content">
            <div class="no-results-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3>{{ getNoResultsText.title }}</h3>
            <p>{{ getNoResultsText.description }}</p>
            <button @click="resetFilters" class="reset-search-btn">Clear Filters</button>
          </div>
        </div>

        <!-- Show more button -->
        <div v-if="searchResults.isSuccess && searchResults?.data?.data && searchResults.data.data.length > 0" class="show-more">
          <img :src="img13" alt="" />
          <span>Show more</span>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import img0 from '@/assets/images/date-icon-select-details.svg'
import img1 from '@/assets/images/edit-svgrepo-com.svg'
import img2 from '@/assets/images/truste.svg'
import img3 from '@/assets/images/currency-icon.svg'
import img4 from '@/assets/images/dropdown-toggle.svg'
import img5 from '@/assets/images/filter-icon.svg'
import img6 from '@/assets/images/sort-by-icon.svg'
import img7 from '@/assets/images/wishlist.svg'
import img8 from '@/assets/images/location-icon-for-cards.svg'
import img9 from '@/assets/images/duration-icon.svg'
import img10 from '@/assets/images/for-ages-icon.svg'
import img11 from '@/assets/images/ninja-face-rating.svg'
import img12 from '@/assets/images/review-icon.svg'
import img13 from '@/assets/images/show-more.svg'

import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchAPI } from '@/api/search';

const route = useRoute();
const router = useRouter();

// UI State
const showFilters = ref(false);
const showSort = ref(false);

// Search parameters
const searchQuery = ref(String(route.query.q || ''));
const selectedDate = ref(String(route.query.date || ''));
const sortBy = ref('best');

// Filters
const filters = ref({
  touristType: '',
  minPrice: '',
  maxPrice: '',
  type: '',
  theme: ''
});

// Available options
const themes = [
  'Cultural tours', 'Adventure tours', 'City tours', 'Food tours', 
  'Safari tours', 'Luxury tours', 'Wildlife & nature tours', 
  'Photography tours', 'Festival tours'
];

// Manual search state management
const searchResults = ref({
  isLoading: false,
  isFetching: false,
  isError: false,
  isSuccess: false,
  data: null,
  error: null
});

// Perform search function
const performSearchRequest = async () => {
  console.log('🔍 Starting search...');
  searchResults.value.isLoading = true;
  searchResults.value.isFetching = true;
  searchResults.value.isError = false;
  searchResults.value.isSuccess = false;
  searchResults.value.error = null;

  try {
    const params = {
      q: searchQuery.value || '',
      date: selectedDate.value || '',
      sort: sortBy.value || '',
      ...filters.value
    };

    console.log('🔍 Search params:', params);
    const result = await searchAPI.searchListings(params);
    console.log('🔍 Search result:', result);

    searchResults.value.data = result;
    searchResults.value.isSuccess = true;
    searchResults.value.isError = false;
  } catch (error) {
    console.error('🔍 Search error:', error);
    searchResults.value.error = error.message;
    searchResults.value.isError = true;
    searchResults.value.isSuccess = false;
    searchResults.value.data = { data: [], total: 0 };
  } finally {
    searchResults.value.isLoading = false;
    searchResults.value.isFetching = false;
  }
};

// Methods
const updateFilter = (key: string, value: any) => {
  filters.value[key] = value;
};

const applyFilters = () => {
  showFilters.value = false;
  // Trigger search after applying filters
  performSearchRequest();
};

const resetFilters = () => {
  filters.value = {
    touristType: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    theme: ''
  };
  // Trigger search after resetting filters
  performSearchRequest();
};

const applySort = () => {
  showSort.value = false;
  // Trigger search after changing sort
  performSearchRequest();
};

const retrySearch = () => {
  performSearchRequest();
};

const viewListing = (listingId: string) => {
  if (listingId) {
    // Use generic listing route - the unified component will handle all types
    router.push(`/listing/${listingId}`);
  }
};

const formatPrice = (price: number) => {
  if (!price || isNaN(price)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

// Dynamic text based on search type
const getListingTypeText = computed(() => {
  const searchType = filters.value.type?.toLowerCase() || route.query.type?.toLowerCase();
  const query = searchQuery.value?.toLowerCase() || '';
  
  const typeMap = {
    'tour': { singular: 'tour', plural: 'tours' },
    'trek': { singular: 'trek', plural: 'treks' },
    'activity': { singular: 'activity', plural: 'activities' },
    'hotel': { singular: 'hotel', plural: 'hotels' },
    'stay': { singular: 'accommodation', plural: 'accommodations' },
    'car_rental': { singular: 'car', plural: 'cars' },
    'bike_rental': { singular: 'bike', plural: 'bikes' },
    'rental': { singular: 'rental', plural: 'rentals' },
    'experience': { singular: 'experience', plural: 'experiences' },
    'guide': { singular: 'guide', plural: 'guides' }
  };
  
  // If we have a specific type filter, use it
  if (searchType && typeMap[searchType]) {
    return typeMap[searchType];
  }
  
  // Try to detect type from search query
  if (query.includes('car') || query.includes('vehicle')) {
    return { singular: 'car', plural: 'cars' };
  }
  if (query.includes('bike') || query.includes('motorcycle')) {
    return { singular: 'bike', plural: 'bikes' };
  }
  if (query.includes('hotel') || query.includes('accommodation')) {
    return { singular: 'hotel', plural: 'hotels' };
  }
  if (query.includes('tour') || query.includes('trip')) {
    return { singular: 'tour', plural: 'tours' };
  }
  if (query.includes('trek') || query.includes('hike')) {
    return { singular: 'trek', plural: 'treks' };
  }
  if (query.includes('activity') || query.includes('adventure')) {
    return { singular: 'activity', plural: 'activities' };
  }
  if (query.includes('experience')) {
    return { singular: 'experience', plural: 'experiences' };
  }
  if (query.includes('guide')) {
    return { singular: 'guide', plural: 'guides' };
  }
  
  // Default fallback
  return { singular: 'listing', plural: 'listings' };
});

const getCountText = computed(() => {
  const count = searchResults.value?.data?.data?.length || searchResults.value?.data?.total || 0;
  const { plural } = getListingTypeText.value;
  return `${count} ${plural} available`;
});

const getNoResultsText = computed(() => {
  const { plural } = getListingTypeText.value;
  
  // More specific descriptions based on type
  const getDescription = () => {
    const searchType = filters.value.type?.toLowerCase() || route.query.type?.toLowerCase();
    
    switch (searchType) {
      case 'car_rental':
        return 'Try adjusting your search criteria or browse car rentals in other cities.';
      case 'bike_rental':
        return 'Try adjusting your search criteria or browse bike rentals in other areas.';
      case 'hotel':
      case 'stay':
        return 'Try adjusting your dates or location, or browse accommodations in nearby areas.';
      case 'tour':
        return 'Try adjusting your search criteria or browse our popular tours.';
      case 'trek':
        return 'Try adjusting your search criteria or browse treks in other regions.';
      case 'activity':
        return 'Try adjusting your search criteria or browse activities in other destinations.';
      case 'experience':
        return 'Try adjusting your search criteria or browse experiences in other locations.';
      case 'guide':
        return 'Try adjusting your search criteria or browse guides in other areas.';
      default:
        return `Try adjusting your search criteria or browse our popular ${plural}.`;
    }
  };
  
  return {
    title: `No ${plural} found`,
    description: getDescription()
  };
});

onMounted(() => {
  // Initialize search from route parameters
  if (route.query.q) {
    searchQuery.value = String(route.query.q);
  }
  if (route.query.date) {
    selectedDate.value = String(route.query.date);
  }
  
  // Perform initial search
  performSearchRequest();
});

// Watch for route query changes (when user searches from header)
watch(() => route.query, (newQuery, oldQuery) => {
  // Only update if query parameters actually changed
  if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
    console.log('🔄 Route query changed:', newQuery);
    
    // Update search parameters from new route query
    if (newQuery.q !== undefined && newQuery.q !== searchQuery.value) {
      searchQuery.value = String(newQuery.q || '');
    }
    if (newQuery.date && newQuery.date !== selectedDate.value) {
      selectedDate.value = String(newQuery.date);
    }
    if (newQuery.type && newQuery.type !== filters.value.type) {
      filters.value.type = String(newQuery.type);
    }
    
    // Trigger new search with updated parameters
    performSearchRequest();
  }
}, { deep: true });
</script>

<style scoped>
.search-result-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.content h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.tours-available {
  color: #666;
  margin-bottom: 10px;
}

.trusted-operator {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #28a745;
  font-size: 14px;
}

.trusted-operator img {
  width: 16px;
  height: 16px;
}

.filter-sort {
  display: flex;
  gap: 10px;
}

.border-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
}

.border-button:hover {
  border-color: #007bff;
  color: #007bff;
}

.border-button img {
  width: 16px;
  height: 16px;
}

/* Filter Popup */
.filter-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.filter-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.option-btn:hover {
  border-color: #007bff;
}

.option-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.price-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.price-inputs input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.sort-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sort-options label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
}

.filter-footer {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.reset-btn, .show-results-btn {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  border: none;
}

.reset-btn {
  background: #f8f9fa;
  color: #666;
}

.show-results-btn {
  background: #007bff;
  color: white;
  flex: 1;
}

/* Loading and Error States */
.loading-state, .error-state, .no-results {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.error-content, .no-results-content {
  max-width: 400px;
  margin: 0 auto;
}

.no-results-icon {
  margin-bottom: 20px;
}

.no-results-icon .icon {
  width: 64px;
  height: 64px;
  color: #9ca3af;
  margin: 0 auto;
}

.no-results-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.no-results-content p {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.reset-search-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.reset-search-btn:hover {
  background: #0056b3;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
}

/* Search Results */
.search-result-list {
  display: grid;
  gap: 20px;
}

.listing-card {
  display: flex;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.listing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.listing-image {
  position: relative;
  width: 200px;
  height: 150px;
  flex-shrink: 0;
}

.listing-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wishlist {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}

.wishlist img {
  width: 16px;
  height: 16px;
}

.listing-info {
  flex: 1;
  padding: 20px;
}

.tag {
  display: inline-block;
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.listing-info h3 {
  margin: 10px 0;
  font-size: 18px;
  color: #333;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-content img {
  width: 16px;
  height: 16px;
}

.listing-provider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  font-size: 14px;
  color: #666;
}

.rating-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
}

.rating-icon img {
  width: 16px;
  height: 16px;
}

.price {
  font-size: 16px;
  color: #333;
  margin: 0;
}

.price span {
  font-weight: bold;
  color: #007bff;
}

.show-more {
  text-align: center;
  padding: 20px;
  color: #007bff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.show-more img {
  width: 16px;
  height: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .search-result-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .filter-sort {
    width: 100%;
  }
  
  .listing-card {
    flex-direction: column;
  }
  
  .listing-image {
    width: 100%;
    height: 200px;
  }
  
  .price-inputs {
    grid-template-columns: 1fr;
  }
}
</style>
