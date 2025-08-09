<template>
  <!-- Main Content - Only show when data is loaded and exists -->
  <main v-if="!loading && !error && listingData">
    <SidebarMobile />

    <!-- Listing Details Component -->
    <ListingDetails
      :title="listingData.title"
      :price="formatPrice(listingData.price)"
      :location="getDisplayLocation()"
      :mainImage="getMainImage()"
      :galleryImages="getGalleryImages()"
      :priceSuffix="getPriceSuffix()"
    />

    <div class="listing-info-details">
      <div class="listing-info">
        <SubHeader :location="getDisplayLocation()" />

        <!-- Type-specific Details -->
        <Details :items="getDetailsItems()" />

        <!-- Mobile Map -->
        <MobileMap :mapSrc="getMapUrl()" />

        <!-- Operator Card Mobile -->
        <OperatorCardMobile
          :logo="getOperatorLogo()"
          :name="getOperatorName()"
          :rating="getOperatorRating()"
          :reviewScore="getOperatorReviewScore()"
          :reviewCount="getOperatorReviewCount()"
        />

        <!-- Operating Hours Mobile -->
        <OperatingHoursMobile
          :name="getOperatorName()"
          :hours="getOperatingHours()"
        />

        <!-- Chat with Operator Mobile -->
        <ChatWithOperatorMobile :name="getOperatorName()" />

        <!-- Protected Booking Card Mobile -->
        <ProtectedBookingCardMobile
          title="Protected booking"
          description="In case of issues, we've got your back. We'll intervene and protect your money."
        />

        <!-- Type-specific Content -->
        <component 
          v-for="section in getContentSections()" 
          :key="section.name"
          :is="section.component" 
          v-bind="section.props"
        />

        <!-- Common sections -->
        <Included
          :includedItems="getIncludedItems()"
          :notIncludedItems="getNotIncludedItems()"
        />

        <MoreDetails :items="getMoreDetailsItems()" />

        <FAQs :items="getFAQItems()" />

        <ReviewCount
          :overallRating="getOverallRating()"
          :totalReviews="getTotalReviews()"
          :ratingBreakdown="getRatingBreakdown()"
          :reviews="getReviews()"
          :icons="{
            filledStar: '@/assets/images/review-icon.svg',
            emptyStar: '@/assets/images/boder-star.svg',
            avatar: '@/assets/images/avatar.png'
          }"
        />
      </div>

      <!-- Sidebar -->
      <div class="sidebar">
        <SelectDetails
          :showPeopleSelector="shouldShowPeopleSelector()"
          :withDriverLabel="getDriverLabel().with"
          :withoutDriverLabel="getDriverLabel().without"
          :selectedDate="getSelectedDate()"
          :pickupTime="getPickupTime()"
          :dropoffTime="getDropoffTime()"
          :addOns="getAddOns()"
          :rentalSummary="getRentalSummary()"
          :cancellationNote="getCancellationNote()"
          :cancellationDeadline="getCancellationDeadline()"
        />

        <Map :map-url="getMapUrl()" />

        <OperatorCard
          :image="getOperatorLogo()"
          :name="getOperatorName()"
          :rating="getOperatorRating()"
          :reviewScore="getOperatorReviewScore()"
          :totalReviews="getOperatorReviewCount()"
        />

        <OperatingHours :hours="getOperatingHours()" />

        <ChatWithOperator
          icon="@/assets/images/chat-after-booking.svg"
          :title="`Chat with ${getOperatorName()}`"
          message="You'll get access to direct chat after booking. Ask anything, confirm plans, stay connected."
        />

        <ProtectedBookingCard
          icon="@/assets/images/protec.svg"
          title="Protected booking"
          message="We'll intervene if anything goes wrong with your booking."
        />
      </div>
    </div>

    <FreeCancellation />
  </main>

  <!-- Loading State -->
  <div v-else-if="loading" class="loading-state">
    <div class="loading-spinner"></div>
    <p>Loading listing details...</p>
  </div>

  <!-- No Listing Found State -->
  <div v-else-if="!loading && !listingData && !error" class="no-listing-state">
    <div class="no-listing-content">
      <div class="no-listing-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6-.306" />
        </svg>
      </div>
      <h2>No Listing Found</h2>
      <p>The listing you're looking for doesn't exist or has been removed.</p>
      <div class="no-listing-actions">
        <button @click="$router.push('/search')" class="search-btn">
          Browse All Listings
        </button>
        <button @click="$router.back()" class="back-btn">
          Go Back
        </button>
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="error-state">
    <div class="error-content">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2>Something went wrong</h2>
      <p>{{ error }}</p>
      <div class="error-actions">
        <button @click="retryLoad" class="retry-btn">
          Try Again
        </button>
        <button @click="$router.push('/search')" class="search-btn">
          Browse All Listings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useListingData } from '@/composables/useListingData';

// Component Imports
import SidebarMobile from './UI/SidebarMobile.vue';
import ListingDetails from './UI/ListingDetails.vue';
import SubHeader from './UI/SubHeader.vue';
import Details from './UI/Details.vue';
import MobileMap from './UI/MobileMap.vue';
import OperatorCardMobile from './UI/OperatorCardMobile.vue';
import OperatingHoursMobile from './UI/OperatingHoursMobile.vue';
import ChatWithOperatorMobile from './UI/ChatWithOperatorMobile.vue';
import ProtectedBookingCardMobile from './UI/ProtectedBookingCardMobile.vue';
import SummaryBox from './UI/SummaryBox.vue';
import Highlights from './UI/Highlights.vue';
import Included from './UI/Included.vue';
import Itinerary from './UI/Itinerary.vue';
import MoreDetails from './UI/MoreDetails.vue';
import FAQs from './UI/FAQs.vue';
import ReviewCount from './UI/ReviewCount.vue';
import SelectDetails from './UI/SelectDetails.vue';
import Map from './UI/Map.vue';
import OperatorCard from './UI/OperatorCard.vue';
import OperatingHours from './UI/OperatingHours.vue';
import ChatWithOperator from './UI/ChatWithOperator.vue';
import ProtectedBookingCard from './UI/ProtectedBookingCard.vue';
import FreeCancellation from './UI/FreeCancellation.vue';

// Props
interface Props {
  listingId?: string;
}

const props = defineProps<Props>();
const route = useRoute();

// Get listing ID from props or route params
const listingId = computed(() => props.listingId || route.params.id as string);

// Use listing data composable
const { listingData, loading, error } = useListingData(listingId);

// Helper functions for different listing types
const formatPrice = (price: number) => {
  if (!price || isNaN(price)) return 'Rs 0';
  return `Rs ${price.toLocaleString()}`;
};

const getDisplayLocation = () => {
  if (!listingData.value) return '';
  
  switch (listingData.value.listing_type) {
    case 'hotel':
    case 'stay':
      return listingData.value.location || listingData.value.meta_data?.location || 'Unknown Location';
    case 'tour':
    case 'trek':
    case 'activity':
    case 'experience':
      return listingData.value.meta_data?.start_location || listingData.value.meta_data?.location || 'Unknown Location';
    case 'car_rental':
    case 'bike_rental':
    case 'rental':
      return listingData.value.meta_data?.location || 'Unknown Location';
    default:
      return listingData.value.meta_data?.location || 'Unknown Location';
  }
};

const getMainImage = () => {
  if (!listingData.value?.meta_data) return '@/assets/images/default-listing.jpg';
  
  const photos = listingData.value.meta_data.photos;
  const coverImage = listingData.value.meta_data.cover_image;
  const mainImage = listingData.value.meta_data.main_image;
  
  return coverImage || mainImage || (photos && photos[0]) || '@/assets/images/default-listing.jpg';
};

const getGalleryImages = () => {
  if (!listingData.value?.meta_data) return [];
  
  return listingData.value.meta_data.photos || 
         listingData.value.meta_data.gallery_images || 
         [];
};

const getPriceSuffix = () => {
  if (!listingData.value) return '';
  
  switch (listingData.value.listing_type) {
    case 'activity':
    case 'experience':
      return '/person';
    case 'tour':
    case 'trek':
      return '/person';
    case 'hotel':
    case 'stay':
      return '/night';
    case 'car_rental':
    case 'bike_rental':
    case 'rental':
      return '/day';
    default:
      return '';
  }
};

const getDetailsItems = () => {
  if (!listingData.value) return [];
  
  const listingType = listingData.value.listing_type;
  const metaData = listingData.value.meta_data || {};
  
  switch (listingType) {
    case 'car_rental':
      return [
        { label: 'Model', value: metaData.model || '2017', icon: '@/assets/images/vehicmode.svg' },
        { label: 'CCs', value: metaData.engine_capacity || '250', icon: '@/assets/images/cc-icon.svg' },
        { label: 'Transmission', value: metaData.transmission || 'Automatic', icon: '@/assets/images/transmission-icon.svg' },
        { label: 'Type', value: metaData.vehicle_type || 'Sedan', icon: '@/assets/images/vehicle-type-icon.svg' }
      ];
      
    case 'bike_rental':
      return [
        { label: 'Model', value: metaData.model || '2017', icon: '@/assets/images/vehicmode.svg' },
        { label: 'CCs', value: metaData.engine_capacity || '250', icon: '@/assets/images/cc-icon.svg' },
        { label: 'Transmission', value: metaData.transmission || 'Manual', icon: '@/assets/images/transmission-icon.svg' },
        { label: 'Type', value: metaData.bike_type || 'Adventure', icon: '@/assets/images/vehicle-type-icon.svg' }
      ];
      
    case 'tour':
    case 'trek':
      return [
        { label: 'Duration', value: metaData.duration || `${metaData.duration_days || 0} days`, icon: '@/assets/images/duration-icon.svg' },
        { label: 'Type', value: metaData.tour_type || metaData.trek_type || 'Group', icon: '@/assets/images/tour-type-icon.svg' },
        { label: 'For Ages', value: metaData.age_range || '14+', icon: '@/assets/images/for-ages-icon.svg' },
        { label: 'Languages', value: Array.isArray(metaData.languages) ? metaData.languages.join(', ') : metaData.languages || 'English, Urdu', icon: '@/assets/images/language-icon.svg' },
        { label: 'Difficulty', value: metaData.difficulty || 'Moderate', icon: '@/assets/images/difficulty-icon.svg' }
      ];
      
    case 'activity':
    case 'experience':
      return [
        { label: 'Duration', value: metaData.duration || '30 minutes', icon: '@/assets/images/duration-icon.svg' },
        { label: 'Activity Type', value: metaData.activity_type || 'Adventure', icon: '@/assets/images/tour-type-icon.svg' },
        { label: 'For Ages', value: metaData.age_range || '14+', icon: '@/assets/images/for-ages-icon.svg' },
        { label: 'Languages', value: Array.isArray(metaData.languages) ? metaData.languages.join(', ') : metaData.languages || 'English, Urdu', icon: '@/assets/images/language-icon.svg' },
        { label: 'Min. people', value: metaData.min_people || '1', icon: '@/assets/images/min-people-icon.svg' },
        { label: 'Difficulty', value: metaData.difficulty || 'Moderate', icon: '@/assets/images/difficulty-icon.svg' }
      ];
      
    default:
      return [];
  }
};

const getContentSections = () => {
  if (!listingData.value) return [];
  
  const sections = [];
  const listingType = listingData.value.listing_type;
  const metaData = listingData.value.meta_data || {};
  
  // Summary/Overview section for tours, treks, activities
  if (['tour', 'trek', 'activity', 'experience'].includes(listingType)) {
    if (metaData.overview || listingData.value.description) {
      sections.push({
        name: 'summary',
        component: 'SummaryBox',
        props: {
          title: 'Overview',
          text: metaData.overview || listingData.value.description
        }
      });
    }
    
    // Highlights section
    if (metaData.highlights && metaData.highlights.length > 0) {
      sections.push({
        name: 'highlights',
        component: 'Highlights',
        props: {
          items: metaData.highlights
        }
      });
    }
    
    // Itinerary section
    if (metaData.itinerary && metaData.itinerary.length > 0) {
      sections.push({
        name: 'itinerary',
        component: 'Itinerary',
        props: {
          title: 'Itinerary',
          items: metaData.itinerary
        }
      });
    }
  }
  
  return sections;
};

const getMapUrl = () => {
  if (!listingData.value?.meta_data) return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.2070127821403!2d73.0897425!3d33.522003000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed2e048746c1%3A0x244a446ba063d544!2sPakistan!5e0!3m2!1sen!2s!4v1745253279331!5m2!1sen!2s';
  
  return listingData.value.meta_data.mapUrl || 
         listingData.value.meta_data.map_url || 
         'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.2070127821403!2d73.0897425!3d33.522003000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed2e048746c1%3A0x244a446ba063d544!2sPakistan!5e0!3m2!1sen!2s!4v1745253279331!5m2!1sen!2s';
};

const getOperatorLogo = () => {
  if (!listingData.value?.supplier?.profile_data) return '@/assets/images/avatar.png';
  
  return listingData.value.supplier.profile_data.logo || '@/assets/images/avatar.png';
};

const getOperatorName = () => {
  if (!listingData.value?.supplier?.profile_data) return 'Travel Operator';
  
  return listingData.value.supplier.profile_data.business_name || 
         listingData.value.supplier.profile_data.name || 
         'Travel Operator';
};

const getOperatorRating = () => {
  if (!listingData.value?.supplier?.profile_data) return '4.5';
  
  return listingData.value.supplier.profile_data.rating || '4.5';
};

const getOperatorReviewScore = () => {
  if (!listingData.value?.supplier?.profile_data) return '4.2';
  
  return listingData.value.supplier.profile_data.review_score || '4.2';
};

const getOperatorReviewCount = () => {
  if (!listingData.value?.supplier?.profile_data) return 15;
  
  return listingData.value.supplier.profile_data.review_count || 15;
};

const getOperatingHours = () => {
  if (!listingData.value?.supplier?.profile_data) return '8AM - 9PM Monday to Sunday';
  
  return listingData.value.supplier.profile_data.operating_hours || 
         listingData.value.supplier.profile_data.hours || 
         '8AM - 9PM Monday to Sunday';
};

const shouldShowPeopleSelector = () => {
  if (!listingData.value) return false;
  
  const listingType = listingData.value.listing_type;
  return ['tour', 'trek', 'activity', 'experience'].includes(listingType);
};

const getDriverLabel = () => {
  if (!listingData.value) return { with: '', without: '' };
  
  const listingType = listingData.value.listing_type;
  if (['car_rental', 'bike_rental', 'rental'].includes(listingType)) {
    return {
      with: 'With Driver',
      without: 'Without Driver'
    };
  }
  
  return { with: '', without: '' };
};

const getSelectedDate = () => {
  if (!listingData.value?.meta_data) return 'Select Date';
  
  return listingData.value.meta_data.selected_date || 
         listingData.value.meta_data.available_date || 
         listingData.value.meta_data.default_date || 
         'Select Date';
};

const getPickupTime = () => {
  if (!listingData.value?.meta_data) return '';
  
  return listingData.value.meta_data.pickup_time || '';
};

const getDropoffTime = () => {
  if (!listingData.value?.meta_data) return '';
  
  return listingData.value.meta_data.dropoff_time || '';
};

const getAddOns = () => {
  if (!listingData.value?.meta_data) return [];
  
  return listingData.value.meta_data.addons || 
         listingData.value.meta_data.add_ons || 
         [];
};

const getRentalSummary = () => {
  if (!listingData.value?.meta_data) return {};
  
  return listingData.value.meta_data.rental_summary || 
         listingData.value.meta_data.summary || 
         {};
};

const getCancellationNote = () => {
  if (!listingData.value?.meta_data) return 'Free cancellation until';
  
  return listingData.value.meta_data.cancellation_note || 'Free cancellation until';
};

const getCancellationDeadline = () => {
  if (!listingData.value?.meta_data) return 'N/A';
  
  return listingData.value.meta_data.cancellation_deadline || 'N/A';
};

const getIncludedItems = () => {
  if (!listingData.value?.meta_data) return [];
  
  const listingType = listingData.value.listing_type;
  
  // Default items based on listing type
  const defaults = {
    car_rental: ['Car', 'Driver', 'Pickup', 'Unlimited Mileage', 'Spare Tire'],
    bike_rental: ['Helmet', 'Box', 'Side Bags', 'Spare Tire'],
    activity: ['Professional guide', 'Safety gear', 'Equipment'],
    tour: ['Professional guide', 'Transportation', 'Entry fees'],
    trek: ['Professional guide', 'Safety equipment', 'Camping gear'],
    hotel: ['WiFi', 'Breakfast', 'Room service'],
    stay: ['WiFi', 'Basic amenities']
  };
  
  return listingData.value.meta_data.included || 
         listingData.value.meta_data.inclusions || 
         defaults[listingType] || 
         [];
};

const getNotIncludedItems = () => {
  if (!listingData.value?.meta_data) return [];
  
  const listingType = listingData.value.listing_type;
  
  // Default items based on listing type
  const defaults = {
    car_rental: ['Insurance', 'Additional Services', 'Fuel'],
    bike_rental: ['Insurance', 'Additional Services', 'Fuel'],
    activity: ['Insurance', 'Personal Expenses', 'Transportation'],
    tour: ['Personal Expenses', 'Insurance', 'Tips'],
    trek: ['Personal gear', 'Insurance', 'Personal expenses'],
    hotel: ['Airport transfer', 'Personal expenses'],
    stay: ['Meals', 'Transportation']
  };
  
  return listingData.value.meta_data.not_included || 
         listingData.value.meta_data.exclusions || 
         defaults[listingType] || 
         [];
};

const getMoreDetailsItems = () => {
  if (!listingData.value?.meta_data) return [];
  
  const listingType = listingData.value.listing_type;
  
  // Default items based on listing type
  const defaults = {
    car_rental: [
      { title: 'Important Information', text: 'A valid CNIC or passport and license is mandatory.' }
    ],
    bike_rental: [
      { title: 'Important Information', text: 'A valid CNIC or passport and license is mandatory.' },
      { title: 'Payment Policy', text: 'Full payment required before vehicle pickup.' }
    ],
    activity: [
      { title: 'Important Information', text: 'Wear comfortable clothing and bring ID.' },
      { title: 'Not Suitable For', text: 'People with heart conditions or pregnancy.' }
    ]
  };
  
  return listingData.value.meta_data.more_details || defaults[listingType] || [];
};

const getFAQItems = () => {
  if (!listingData.value?.meta_data) return [];
  
  return listingData.value.meta_data.faqs || [];
};

const getOverallRating = () => {
  if (!listingData.value) return 4.0;
  
  return listingData.value.reviews_avg || 
         listingData.value.meta_data?.overall_rating || 
         4.0;
};

const getTotalReviews = () => {
  if (!listingData.value) return 0;
  
  return listingData.value.reviews_count || 
         listingData.value.meta_data?.total_reviews || 
         0;
};

const getRatingBreakdown = () => {
  if (!listingData.value?.meta_data) return [];
  
  return listingData.value.meta_data.rating_breakdown || [];
};

const getReviews = () => {
  if (!listingData.value) return [];
  
  return listingData.value.reviews || 
         listingData.value.meta_data?.reviews || 
         [];
};

// Retry loading the listing
const retryLoad = () => {
  window.location.reload();
};
</script>

<style scoped>
.listing-info-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.listing-info {
  flex: 1;
}

.sidebar {
  width: 400px;
}

@media (max-width: 1024px) {
  .listing-info-details {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .sidebar {
    width: 100%;
  }
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 60px 20px;
  color: #6b7280;
}

.loading-spinner {
  border: 4px solid #f3f4f4;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  font-size: 16px;
  margin: 0;
}

/* No Listing Found State */
.no-listing-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 60px 20px;
}

.no-listing-content {
  text-align: center;
  max-width: 500px;
}

.no-listing-icon {
  margin-bottom: 20px;
}

.no-listing-icon .icon {
  width: 80px;
  height: 80px;
  color: #9ca3af;
  margin: 0 auto;
}

.no-listing-content h2 {
  font-size: 24px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.no-listing-content p {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 30px;
  line-height: 1.5;
}

.no-listing-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Error State */
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 60px 20px;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-icon {
  margin-bottom: 20px;
}

.error-icon .icon {
  width: 80px;
  height: 80px;
  color: #ef4444;
  margin: 0 auto;
}

.error-content h2 {
  font-size: 24px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.error-content p {
  font-size: 16px;
  color: #ef4444;
  margin-bottom: 30px;
  line-height: 1.5;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Action Buttons */
.search-btn, .back-btn, .retry-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.search-btn {
  background-color: #007bff;
  color: white;
}

.search-btn:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.back-btn {
  background-color: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}

.back-btn:hover {
  background-color: #e9ecef;
  color: #495057;
}

.retry-btn {
  background-color: #28a745;
  color: white;
}

.retry-btn:hover {
  background-color: #218838;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .no-listing-state,
  .error-state {
    min-height: 50vh;
    padding: 40px 20px;
  }
  
  .no-listing-icon .icon,
  .error-icon .icon {
    width: 60px;
    height: 60px;
  }
  
  .no-listing-content h2,
  .error-content h2 {
    font-size: 20px;
  }
  
  .no-listing-content p,
  .error-content p {
    font-size: 14px;
  }
  
  .no-listing-actions,
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .search-btn, .back-btn, .retry-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
