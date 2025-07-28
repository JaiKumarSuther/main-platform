<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/axios";

import SidebarMobile from "../components/UI/SidebarMobile.vue";
import ListingDetails from "../components/UI/ListingDetails.vue";
import SubHeader from "../components/UI/SubHeader.vue";
import Details from "../components/UI/Details.vue";
import MobileMap from "../components/UI/MobileMap.vue";
import OperatorCardMobile from "../components/UI/OperatorCardMobile.vue";
import OperatingHoursMobile from "../components/UI/OperatingHoursMobile.vue";
import ChatWithOperatorMobile from "../components/UI/ChatWithOperatorMobile.vue";
import ProtectedBookingCardMobile from "../components/UI/ProtectedBookingCardMobile.vue";
import SummaryBox from "../components/UI/SummaryBox.vue";
import Included from "../components/UI/Included.vue";
import Itinerary from "../components/UI/Itinerary.vue";
import MoreDetails from "../components/UI/MoreDetails.vue";
import FAQs from "../components/UI/FAQs.vue";
import ReviewCount from "../components/UI/ReviewCount.vue";
import SelectDetails from "../components/UI/SelectDetails.vue";
import Map from "../components/UI/Map.vue";
import OperatorCard from "../components/UI/OperatorCard.vue";
import OperatingHours from "../components/UI/OperatingHours.vue";
import ChatWithOperator from "../components/UI/ChatWithOperator.vue";
import ProtectedBookingCard from "../components/UI/ProtectedBookingCard.vue";
import FreeCancellation from "../components/UI/FreeCancellation.vue";
import Highlights from "../components/UI/Highlights.vue";

const route = useRoute();
const listingId = route.params.id as string;

const listingData = ref<any>(null);
const loading = ref(true);

const fetchListingDetails = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found.");

    const res = await api.get(`/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    listingData.value = res.data;
  } catch (error) {
    console.error("Failed to load listing:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchListingDetails);
</script>


<template>
  <main>
    <SidebarMobile />

    <ListingDetails
      :title="listingData?.title"
      :price="listingData?.price"
      :location="listingData?.starts_in"
      :mainImage="listingData?.main_image"
      :galleryImages="listingData?.gallery_images"
      :priceSuffix="listingData?.priceSuffix"
    />

    <div class="listing-info-details">
      <div class="listing-info">
        <SubHeader :location="listingData?.starts_in" />

        <Details :items="[
          { label: 'Duration', value: listingData?.duration || 'N/A', icon: '@/assets/images/duration-icon.svg' },
          { label: 'Type', value: listingData?.experience_type || 'N/A', icon: '@/assets/images/tour-type-icon.svg' },
          { label: 'For Ages', value: listingData?.age_range || 'N/A', icon: '@/assets/images/for-ages-icon.svg' },
          { label: 'Languages', value: listingData?.languages || 'N/A', icon: '@/assets/images/language-icon.svg' },
          { label: 'Theme', value: listingData?.theme || 'N/A', icon: '@/assets/images/tour-theme-and-experience-type-icon.svg' }
        ]" />

        <MobileMap :mapSrc="listingData?.map_url" />

        <OperatorCardMobile
          :logo="listingData?.operator?.logo || '@/assets/images/avatar.png'"
          :name="listingData?.operator?.name || 'N/A'"
          :rating="listingData?.operator?.rating || 'N/A'"
          :reviewScore="listingData?.operator?.reviewScore || 'N/A'"
          :reviewCount="listingData?.operator?.reviewCount || 0"
        />

        <OperatingHoursMobile
          :name="listingData?.operator?.name || 'N/A'"
          :hours="listingData?.operator?.hours || 'N/A'"
        />

        <ChatWithOperatorMobile :name="listingData?.operator?.name || 'N/A'" />

        <ProtectedBookingCardMobile
          title="Protected booking"
          description="In case of issues, we've got your back. We'll intervene and protect your money."
        />

        <SummaryBox
          title="Summary"
          :text="listingData?.summary || 'Summary not available.'"
        />

        <Highlights :items="listingData?.highlights || []" />

        <Included
          :includedItems="listingData?.inclusions || []"
          :notIncludedItems="listingData?.exclusions || []"
        />

        <Itinerary
          title="Itinerary"
          :items="listingData?.itinerary || []"
        />

        <MoreDetails
          :items="listingData?.more_details || []"
        />

        <FAQs
          :items="listingData?.faqs || []"
        />

        <ReviewCount
          :overallRating="listingData?.ratings?.overall || 0"
          :totalReviews="listingData?.ratings?.total || 0"
          :ratingBreakdown="listingData?.ratings?.breakdown || []"
          :reviews="listingData?.reviews || []"
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
          :selectedDate="listingData?.default_date || 'Select Date'"
          :addOns="listingData?.addons || []"
          :rentalSummary="listingData?.rental_summary"
          :cancellationNote="listingData?.cancellation_note || 'Free cancellation until'"
          :cancellationDeadline="listingData?.cancellation_deadline || 'N/A'"
        />

        <Map :map-url="listingData?.map_url" />

        <OperatorCard
          :image="listingData?.operator?.logo || '@/assets/images/avatar.png'"
          :name="listingData?.operator?.name || 'N/A'"
          :rating="listingData?.operator?.rating || 'N/A'"
          :reviewScore="listingData?.operator?.reviewScore || 'N/A'"
          :totalReviews="listingData?.operator?.reviewCount || 0"
        />

        <OperatingHours :hours="listingData?.operator?.hours || 'N/A'" />

        <ChatWithOperator
          icon="@/assets/images/chat-after-booking.svg"
          :title="`Chat with ${listingData?.operator?.name || 'Tour Operator'}`"
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
</template>

