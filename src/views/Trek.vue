<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/axios';

// Import components
import SidebarMobile from "../components/UI/SidebarMobile.vue";
import ListingDetails from "../components/UI/ListingDetails.vue";
import SubHeader from "../components/UI/SubHeader.vue";
import Details from "../components/UI/Details.vue";
import MobileMap from "../components/UI/MobileMap.vue";
import OperatorCardMobile from "../components/UI/OperatorCardMobile.vue";
import ChatWithOperatorMobile from "../components/UI/ChatWithOperatorMobile.vue";
import ProtectedBookingCardMobile from "../components/UI/ProtectedBookingCardMobile.vue";
import SummaryBox from "../components/UI/SummaryBox.vue";
import Highlights from "../components/UI/Highlights.vue";
import Included from "../components/UI/Included.vue";
import Itinerary from "../components/UI/Itinerary.vue";
import MoreDetails from "../components/UI/MoreDetails.vue";
import FAQs from "../components/UI/FAQs.vue";
import ReviewCount from "../components/UI/ReviewCount.vue";
import SelectDetails from "../components/UI/SelectDetails.vue";
import Map from "../components/UI/Map.vue";
import OperatorCard from "../components/UI/OperatorCard.vue";

// Route & State
const route = useRoute();
const listingId = route.params.id as string;

const trekData = ref<any>(null);
const loading = ref(true);
const error = ref('');

const fetchTrekDetails = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found.');

    const res = await api.get(`/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    trekData.value = res.data;
    console.log('✅ Listing/Trek Data:', res.data);

  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Failed to load trek details.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTrekDetails();
});
</script>

<template>
  <main>
    <div v-if="loading" class="text-center py-10">Loading trek details...</div>
    <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>

    <div v-else>
      <SidebarMobile />

      <ListingDetails
        :title="trekData?.title"
        :price="`$${trekData?.price}`"
        :location="trekData?.meta_data?.start_location"
        :mainImage="trekData?.meta_data?.cover_image || '@/assets/images/17940.jpg'"
        :galleryImages="trekData?.meta_data?.gallery_images || []"
      />

      <div class="listing-info-details">
        <div class="listing-info">
          <SubHeader :location="trekData?.meta_data?.start_location" />

          <Details :items="[
            { label: 'Duration', value: `${trekData?.meta_data?.duration_days || 0} days`, icon: '@/assets/images/duration-icon.svg' },
            { label: 'Trek Type', value: trekData?.meta_data?.trek_type || 'N/A', icon: '@/assets/images/tour-type-icon.svg' },
            { label: 'For Ages', value: trekData?.meta_data?.age_range || 'N/A', icon: '@/assets/images/for-ages-icon.svg' },
            { label: 'Languages', value: trekData?.meta_data?.languages?.join(', ') || 'English, Urdu', icon: '@/assets/images/language-icon.svg' },
            { label: 'Difficulty', value: trekData?.meta_data?.difficulty || 'Moderate', icon: '@/assets/images/difficulty-icon.svg' }
          ]" />

          <MobileMap :mapSrc="trekData?.meta_data?.map_url || 'YOUR_DEFAULT_MAP_URL'" />

          <OperatorCardMobile
            :logo="trekData?.supplier?.profile_data?.logo || '@/assets/images/Asset 1.png'"
            :name="trekData?.supplier?.profile_data?.business_name"
            :rating="trekData?.supplier?.profile_data?.rating || '4.5'"
            :reviewScore="trekData?.supplier?.profile_data?.review_score || '4.2'"
            :reviewCount="trekData?.supplier?.profile_data?.review_count || 15"
          />

          <ChatWithOperatorMobile :name="trekData?.supplier?.profile_data?.business_name" />

          <ProtectedBookingCardMobile
            title="Protected booking"
            description="In case of issues, we've got your back. We'll intervene and protect your money."
          />

          <SummaryBox
            title="Overview"
            :text="trekData?.description || 'No description available.'"
          />

          <Highlights :items="trekData?.meta_data?.highlights || []" />

          <Included
            :includedItems="trekData?.meta_data?.included || []"
            :notIncludedItems="trekData?.meta_data?.not_included || []"
          />

          <Itinerary
            title="Itinerary"
            :items="trekData?.meta_data?.itinerary || []"
          />

          <MoreDetails
            :items="trekData?.meta_data?.more_details || []"
          />

          <FAQs
            :items="trekData?.meta_data?.faqs || []"
          />

          <ReviewCount
            :overallRating="trekData?.meta_data?.overall_rating || 4.0"
            :totalReviews="trekData?.meta_data?.total_reviews || 0"
            :ratingBreakdown="trekData?.meta_data?.rating_breakdown || []"
            :reviews="trekData?.meta_data?.reviews || []"
            :icons="{
              filledStar: '@/assets/images/review-icon.svg',
              emptyStar: '@/assets/images/boder-star.svg',
              avatar: '@/assets/images/avatar.png'
            }"
          />
        </div>

        <div class="sidebar">
          <SelectDetails
            :showPeopleSelector="true"
            :selectedDate="trekData?.meta_data?.available_date || 'Select Date'"
            :addOns="trekData?.meta_data?.addons || []"
            :rentalSummary="trekData?.meta_data?.summary || {}"
            :cancellationNote="trekData?.meta_data?.cancellation_note || 'Free cancellation until...'"
            :cancellationDeadline="trekData?.meta_data?.cancellation_deadline || 'N/A'"
          />

          <Map :map-url="trekData?.meta_data?.map_url || 'YOUR_DEFAULT_MAP_URL'" />

          <OperatorCard
            :image="trekData?.supplier?.profile_data?.logo || '@/assets/images/eventica-color-logo-final-1536x961.png'"
            :name="trekData?.supplier?.profile_data?.business_name"
            :rating="trekData?.supplier?.profile_data?.rating || '4.5'"
            :reviewScore="trekData?.supplier?.profile_data?.review_score || '4.2'"
            :totalReviews="trekData?.supplier?.profile_data?.review_count || 15"
          />
        </div>
      </div>
    </div>
  </main>
</template>
