<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/axios'; 

// Component Imports
import Map from '../components/UI/Map.vue';
import FAQs from '../components/UI/FAQs.vue';
import Details from '../components/UI/Details.vue';
import Included from '../components/UI/Included.vue';
import MobileMap from '../components/UI/MobileMap.vue';
import SubHeader from '../components/UI/SubHeader.vue';
import ReviewCount from '../components/UI/ReviewCount.vue';
import MoreDetails from '../components/UI/MoreDetails.vue';
import OperatorCard from '../components/UI/OperatorCard.vue';
import SelectDetails from '../components/UI/SelectDetails.vue';
import SidebarMobile from '../components/UI/SidebarMobile.vue';
import OperatingHours from '../components/UI/OperatingHours.vue';
import ListingDetails from '../components/UI/ListingDetails.vue';
import FreeCancellation from '../components/UI/FreeCancellation.vue';
import ChatWithOperator from '../components/UI/ChatWithOperator.vue';
import OperatorCardMobile from '../components/UI/OperatorCardMobile.vue';
import ProtectedBookingCard from '../components/UI/ProtectedBookingCard.vue';
import OperatingHoursMobile from '../components/UI/OperatingHoursMobile.vue';
import ChatWithOperatorMobile from '../components/UI/ChatWithOperatorMobile.vue';
import ProtectedBookingCardMobile from '../components/UI/ProtectedBookingCardMobile.vue';

const route = useRoute();
const listingId = route.params.id as string;

const listing = ref<any | null>(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  if (!listingId) {
    error.value = 'Listing ID is missing';
    loading.value = false;
    return;
  }

  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');

    const res = await api.get(`/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    listing.value = res.data;
    console.log('📦 Listing API Data:', listing.value);
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Failed to load listing';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main v-if="!loading && listing">
    <SidebarMobile />

    <ListingDetails
      :title="listing.title"
      :price="`Rs ${listing.price}`"
      :location="listing.meta_data?.location"
      :mainImage="listing.meta_data?.photos?.[0]"
      :galleryImages="listing.meta_data?.photos"
    />

    <div class="listing-info-details">
      <div class="listing-info">
        <SubHeader :location="listing.meta_data?.location || 'Islamabad'" />

        <Details
          :items="[
            { label: 'Model', value: '2017', icon: '@/assets/images/vehicmode.svg' },
            { label: 'CCs', value: '250', icon: '@/assets/images/cc-icon.svg' },
            { label: 'Transmission', value: 'Automatic', icon: '@/assets/images/transmission-icon.svg' },
            { label: 'Type', value: 'Sedan', icon: '@/assets/images/vehicle-type-icon.svg' }
          ]"
        />

        <MobileMap
          :mapSrc="listing.meta_data?.mapUrl || 'https://www.google.com/maps/embed?...'"
        />

        <OperatorCardMobile
          logo="@/assets/images/fast track.jpg"
          name="Fast Track Car Rental"
          reviewScore="4.2"
          reviewCount="15"
          rating="4.5"
        />

        <OperatingHoursMobile
          name="Fast Track Car Rental"
          hours="8AM - 9PM Monday to Sunday"
        />

        <ChatWithOperatorMobile name="Fast Track Car Rental" />

        <ProtectedBookingCardMobile
          title="Protected booking"
          description="In case of issues, we've got your back. We'll intervene and protect your money."
        />

        <Included
          :includedItems="['Car', 'Driver', 'Pickup', 'Unlimited Mileage', 'Spare Tire']"
          :notIncludedItems="['Insurance', 'Additional Services', 'Fuel']"
        />

        <MoreDetails
          :items="[
            { title: 'Important Information', text: 'A valid CNIC or passport and license is mandatory.' }
          ]"
        />

        <FAQs
          :items="[
            {
              question: 'What if the car breaks down during my trip?',
              answer: 'Call our 24/7 support. Roadside assistance or a replacement will be arranged.'
            },
            {
              question: 'What documents do I need to rent a car?',
              answer: 'You need CNIC/passport and a valid driving license.'
            },
            {
              question: 'Is there a security deposit required, and how much is it?',
              answer: 'Yes. Details vary by vehicle type and rental duration.'
            },
            {
              question: 'Can I pick up the car from one location and return it to another?',
              answer: 'Yes, with prior coordination.'
            }
          ]"
        />

        <ReviewCount
          :overallRating="4.0"
          :totalReviews="21"
          :ratingBreakdown="[
            { rating: 5, count: 16 },
            { rating: 4, count: 5 },
            { rating: 3, count: 0 },
            { rating: 2, count: 0 },
            { rating: 1, count: 0 }
          ]"
          :reviews="[
            {
              name: 'Wamiq Ahmed',
              date: '27 July 2025',
              rating: 5,
              comment: 'Had a great experience...',
              images: [
                '@/assets/images/thhunzagalleryimg4.jpg',
                '@/assets/images/hunzagalleryimg1.jpg',
                '@/assets/images/hunzagalleryimg2.jpg',
                '@/assets/images/hunzagalleryimg3.jpg',
                '@/assets/images/hunzagalleryimg5.jpg'
              ]
            },
            {
              name: 'Faisal',
              date: '8 Jun 2025',
              rating: 5,
              comment: 'Book with them, they\'re probably the best in Pakistan.',
              reply: {
                name: 'Eventica Travels',
                message: 'Thank you so much for the kind words...'
              }
            }
          ]"
          :icons="{
            filledStar: '@/assets/images/review-icon.svg',
            emptyStar: '@/assets/images/boder-star.svg',
            avatar: '@/assets/images/avatar.png'
          }"
        />
      </div>

      <div class="sidebar">
        <SelectDetails
          :withDriverLabel="'With Driver'"
          :withoutDriverLabel="'Without Driver'"
          :selectedDate="'7 July 2025'"
          :pickupTime="'13:00'"
          :dropoffTime="'17:00'"
          :addOns="[
            { label: 'Passenger Helmet', price: 'Rs 1,200' },
            { label: 'Top Box', price: 'Rs 1,200' }
          ]"
          :rentalSummary="{
            days: 8,
            total: 'Rs 86,400',
            breakdown: [
              { label: '8 Days Rental', amount: 'Rs 67,200' },
              { label: 'Passenger Helmet', amount: 'Rs 9600' },
              { label: 'Top Box', amount: 'Rs 9600' }
            ]
          }"
          cancellationNote="Free cancellation until"
          cancellationDeadline="6th May, 23:59 PM"
        />

        <Map
          :map-url="listing.meta_data?.mapUrl || 'https://www.google.com/maps/embed?...'"
        />

        <OperatorCard
          image="@/assets/images/fast track.jpg"
          name="Fast Track Car Rental"
          rating="4.5"
          reviewScore="4.2"
          :totalReviews="15"
        />

        <OperatingHours hours="8AM - 9PM Monday to Sunday" />

        <ChatWithOperator
          icon="@/assets/images/chat-after-booking.svg"
          title="Chat with Fast Track Car Rental"
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

  <div v-else-if="loading" class="text-center py-10 text-gray-600">
    Loading listing...
  </div>
  <div v-else class="text-red-500 text-center py-10">
    {{ error }}
  </div>
</template>
