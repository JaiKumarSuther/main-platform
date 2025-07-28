<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/axios";

// Component Imports
import SelectDetails from "../components/UI/SelectDetails.vue";
import Map from "../components/UI/Map.vue";
import MobileMap from "../components/UI/MobileMap.vue";
import OperatorCardMobile from "../components/UI/OperatorCardMobile.vue";
import OperatingHoursMobile from "../components/UI/OperatingHoursMobile.vue";
import ChatWithOperatorMobile from "../components/UI/ChatWithOperatorMobile.vue";
import ProtectedBookingCardMobile from "../components/UI/ProtectedBookingCardMobile.vue";
import SidebarMobile from "../components/UI/SidebarMobile.vue";
import ListingDetails from "../components/UI/ListingDetails.vue";
import SubHeader from "../components/UI/SubHeader.vue";
import Details from "../components/UI/Details.vue";
import Included from "../components/UI/Included.vue";
import MoreDetails from "../components/UI/MoreDetails.vue";
import FAQs from "../components/UI/FAQs.vue";
import ReviewCount from "../components/UI/ReviewCount.vue";
import SummaryBox from "../components/UI/SummaryBox.vue";
import Itinerary from "../components/UI/Itinerary.vue";
import FreeCancellation from "../components/UI/FreeCancellation.vue";

// Setup
const route = useRoute();
const activityId = route.params.id as string;

const loading = ref(true);
const error = ref("");
const activityData = ref<any | null>(null);

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Auth token missing.");

    const res = await api.get(`/listings/${activityId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    activityData.value = res.data;
    console.log("📦 Activity API:", res.data);
  } catch (err: any) {
    error.value =
      err.response?.data?.message ||
      err.message ||
      "Failed to load activity.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main v-if="!loading && activityData">
    <SidebarMobile />

    <ListingDetails
      :title="activityData.title"
      :price="`Rs ${activityData.price}`"
      :location="activityData.meta_data?.location || 'Unknown Location'"
      :mainImage="activityData.meta_data?.photos?.[0] || '@/assets/images/default-activity.jpg'"
      :galleryImages="activityData.meta_data?.photos || []"
      priceSuffix="/person"
    />

    <div class="listing-info-details">
      <div class="listing-info">
        <SubHeader :location="activityData.meta_data?.location || 'Unknown Location'" />

        <Details
          :items="[
            { label: 'Duration', value: '30 minutes', icon: '@/assets/images/duration-icon.svg' },
            { label: 'Activity Type', value: 'Paragliding', icon: '@/assets/images/tour-type-icon.svg' },
            { label: 'For Ages', value: '14 to 50 years old', icon: '@/assets/images/for-ages-icon.svg' },
            { label: 'Languages', value: 'English, Urdu', icon: '@/assets/images/language-icon.svg' },
            { label: 'Min. people', value: '1', icon: '@/assets/images/min-people-icon.svg' },
            { label: 'Difficulty', value: 'Moderate', icon: '@/assets/images/difficulty-icon.svg' }
          ]"
        />

        <MobileMap :mapSrc="activityData.meta_data?.mapUrl || 'https://www.google.com/maps/embed?...'" />

        <OperatorCardMobile
          logo="@/assets/images/hunza-paragliding-club.png"
          name="Hunza Paragliding Club"
          rating="4.5"
          reviewScore="4.2"
          reviewCount="15"
        />

        <OperatingHoursMobile
          name="Hunza Paragliding Club"
          hours="8AM - 9PM Monday to Sunday"
        />

        <ChatWithOperatorMobile name="Hunza Paragliding Club" />

        <ProtectedBookingCardMobile
          title="Protected booking"
          description="In case of issues, we've got your back. We'll intervene and protect your money."
        />

        <SummaryBox
          v-if="activityData.meta_data?.overview"
          title="Overview"
          :text="activityData.meta_data.overview"
        />

        <Included
          :includedItems="[
            'Professional tandem paragliding pilot',
            'Safety gear (helmet, harness)',
            'Gopro video footage of your flight',
            'Transportation to the takeoff site',
            'Complimentary refreshments'
          ]"
          :notIncludedItems="[
            'Insurance',
            'Additional Services',
            'Personal Expenses'
          ]"
        />

        <Itinerary
          v-if="activityData.meta_data?.itinerary"
          title="Itinerary"
          :items="activityData.meta_data.itinerary"
        />

        <MoreDetails
          :items="[
            { title: 'Important Information', text: 'Wear comfortable clothing and bring ID.' },
            { title: 'Not Suitable For', text: 'People with heart conditions or pregnancy.' },
            { title: 'What to bring', text: 'Comfortable clothes, camera, sunscreen.' }
          ]"
        />

        <FAQs
          :items="[
            { question: 'Is paragliding safe for beginners?', answer: 'Yes! Certified pilots ensure full safety with a pre-flight briefing.' },
            { question: 'What should I wear?', answer: 'Comfortable sportswear and sturdy shoes are recommended.' },
            { question: 'Do I need experience?', answer: 'No prior experience required. Tandem flight is beginner-friendly.' },
            { question: 'What if the weather is bad?', answer: 'Flights may be rescheduled or refunded due to safety concerns.' }
          ]"
        />

        <ReviewCount
          :overallRating="activityData.reviews_avg || 0"
          :totalReviews="activityData.reviews_count || 0"
          :ratingBreakdown="activityData.rating_breakdown || []"
          :reviews="activityData.reviews || []"
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
          selectedDate="26 August 2025"
          :addOns="[
            { label: 'Extended Flight', price: 'Rs 3,000' },
            { label: '4K GoPro Footage', price: 'Rs 4,200' }
          ]"
          :rentalSummary="{
            days: 1,
            total: 'Rs 543,000',
            breakdown: [
              { label: '2x Adults', amount: 'Rs 540,000' },
              { label: '1x Infant', amount: 'Rs 0' },
              { label: 'Add On 1', amount: 'Rs 3,000' }
            ]
          }"
          cancellationNote="Free cancellation until"
          cancellationDeadline="6th May"
        />

        <Map :map-url="activityData.meta_data?.mapUrl || 'https://www.google.com/maps/embed?...'" />

        <OperatorCard
          image="@/assets/images/hunza-paragliding-club.png"
          name="Hunza Paragliding Club"
          rating="4.5"
          reviewScore="4.2"
          :totalReviews="15"
        />

        <OperatingHours hours="8AM - 9PM Monday to Sunday" />

        <ChatWithOperator
          icon="@/assets/images/chat-after-booking.svg"
          title="Chat with Hunza Paragliding Club"
          message="Ask anything, confirm plans, stay connected."
        />

        <ProtectedBookingCard
          icon="@/assets/images/protec.svg"
          title="Protected booking"
          message="In case of issues, we'll intervene and protect your money."
        />
      </div>
    </div>

    <FreeCancellation />
  </main>

  <div v-else-if="loading" class="text-center py-10 text-gray-500">
    Loading activity details...
  </div>

  <div v-else class="text-center text-red-500 py-10">
    {{ error }}
  </div>
</template>
