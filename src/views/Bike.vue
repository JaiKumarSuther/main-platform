<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // For getting the route parameter (ID)
import api from '../api/axios'; // Import your API service

// Import components
import SelectDetails from "../components/UI/SelectDetails.vue";
import Map from "../components/UI/Map.vue";
import MobileMap from "../components/UI/MobileMap.vue";
import OperatorCard from "../components/UI/OperatorCard.vue";
import OperatorCardMobile from "../components/UI/OperatorCardMobile.vue";
import OperatingHours from "../components/UI/OperatingHours.vue";
import OperatingHoursMobile from "../components/UI/OperatingHoursMobile.vue";
import ChatWithOperator from "../components/UI/ChatWithOperator.vue";
import ChatWithOperatorMobile from "../components/UI/ChatWithOperatorMobile.vue";
import ProtectedBookingCard from "../components/UI/ProtectedBookingCard.vue";
import ProtectedBookingCardMobile from "../components/UI/ProtectedBookingCardMobile.vue";
import SidebarMobile from "../components/UI/SidebarMobile.vue";
import ListingDetails from "../components/UI/ListingDetails.vue";
import SubHeader from "../components/UI/SubHeader.vue";
import Details from "../components/UI/Details.vue";
import Included from "../components/UI/Included.vue";
import MoreDetails from "../components/UI/MoreDetails.vue";
import FAQs from "../components/UI/FAQs.vue";
import ReviewCount from "../components/UI/ReviewCount.vue";
import FreeCancellation from "../components/UI/FreeCancellation.vue";

// Import images
// import defaultBike from '@/assets/images/default-bike.jpg';
import vehicleModelIcon from '@/assets/images/vehicmode.svg';
import ccIcon from '@/assets/images/cc-icon.svg';
import transmissionIcon from '@/assets/images/transmission-icon.svg';
import vehicleTypeIcon from '@/assets/images/vehicle-type-icon.svg';
import pakistanBikersLogo from '@/assets/images/pakistanbikers.jpg';
import hunzaGalleryImg1 from '@/assets/images/hunzagalleryimg1.jpg';
import hunzaGalleryImg2 from '@/assets/images/hunzagalleryimg2.jpg';
import hunzaGalleryImg3 from '@/assets/images/hunzagalleryimg3.jpg';
import hunzaGalleryImg4 from '@/assets/images/thhunzagalleryimg4.jpg';
import hunzaGalleryImg5 from '@/assets/images/hunzagalleryimg5.jpg';
import chatIcon from '@/assets/images/chat-after-booking.svg';
import protectionIcon from '@/assets/images/protec.svg';
import filledStarIcon from '@/assets/images/review-icon.svg';
import emptyStarIcon from '@/assets/images/boder-star.svg';
import avatarImage from '@/assets/images/avatar.png';

// Declare reactive variables
const bikeData = ref({
  title: '',
  price: '',
  location: '',
  mainImage: '',
  galleryImages: []
});

const route = useRoute();
const bikeId = route.params.id;  // Fetch the bike ID from the route
const loading = ref(true);
const error = ref('');

// Fetch data when the component mounts
onMounted(async () => {
  try {
    const res = await api.get(`/listings/${bikeId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    bikeData.value = {
      title: res.data.title,
      price: `Rs ${res.data.price}`,
      location: res.data.meta_data?.location || 'Unknown location',
      mainImage: res.data.meta_data?.photos?.[0] || '',
      galleryImages: res.data.meta_data?.photos || []
    };
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load bike data';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main>
    <SidebarMobile />
    <ListingDetails
      :title="bikeData.title"
      :price="bikeData.price"
      :location="bikeData.location"
      :mainImage="bikeData.mainImage"
      :galleryImages="bikeData.galleryImages"
    />

    <div class="listing-info-details">
      <div class="listing-info">
        <SubHeader location="Islamabad" />

        <Details
          :items="[
            {
              label: 'Model',
              value: '2017',
              icon: vehicleModelIcon,
            },
            { label: 'CCs', value: '250', icon: ccIcon },
            {
              label: 'Transmission',
              value: 'Automatic',
              icon: transmissionIcon,
            },
            {
              label: 'Type',
              value: 'Adventure',
              icon: vehicleTypeIcon,
            },
          ]"
        />

        <MobileMap
          mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.2070127821403!2d73.0897425!3d33.522003000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed2e048746c1%3A0x244a446ba063d544!2sPakistan%20Bikers!5e0!3m2!1sen!2s!4v1745253279331!5m2!1sen!2s"
        />

        <OperatorCardMobile
          :logo="pakistanBikersLogo"
          name="Pakistan Bikers"
          rating="4.5"
          reviewScore="4.2"
          reviewCount="15"
        />

        <OperatingHoursMobile
          name="Pakistan Bikers"
          hours="8AM - 9PM Monday to Sunday"
        />

        <ChatWithOperatorMobile name="Pakistan Bikers" />

        <ProtectedBookingCardMobile
          title="Your booking is safe"
          description="We will step in if any issues arise with your booking."
        />

        <Included
          :includedItems="['Helmet', 'Box', 'Side Bags', 'Spare Tire']"
          :notIncludedItems="['Insurance', 'Additional Services', 'Fuel']"
        />

        <MoreDetails
          :items="[
            {
              title: 'Important Information',
              text: 'A valid CNIC or passport and license is mandatory.',
            },
            {
              title: 'Payment Policy',
              text: 'Full payment required before vehicle pickup.',
            },
          ]"
        />

        <FAQs
          :items="[
            {
              question: 'What documents do I need to rent a bike?',
              answer:
                'Valid CNIC or passport and a driving license are required.',
            },
            {
              question: 'Is fuel included in the rental price?',
              answer: 'No, fuel charges are borne by the customer.',
            },
            {
              question: 'Can I take the bike off-road?',
              answer: 'Yes, but prior approval from the operator is needed.',
            },
            {
              question: 'What happens in case of breakdown?',
              answer:
                'Call our 24/7 support; we will dispatch help immediately.',
            },
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
            { rating: 1, count: 0 },
          ]"
          :reviews="[
            {
              name: 'Wamiq Ahmed',
              date: '27 July 2025',
              rating: 5,
              comment: 'Had a great experience...',
              images: [
                hunzaGalleryImg4,
                hunzaGalleryImg1,
                hunzaGalleryImg2,
                hunzaGalleryImg3,
                hunzaGalleryImg5,
              ],
            },
            {
              name: 'Faisal',
              date: '8 Jun 2025',
              rating: 5,
              comment:
                'Book with them, they\'re probably the best in Pakistan.',
              reply: {
                name: 'Eventica Travels',
                message: 'Thank you so much for the kind words...',
              },
            },
          ]"
          :icons="{
            filledStar: filledStarIcon,
            emptyStar: emptyStarIcon,
            avatar: avatarImage,
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
            { label: 'Top Box', price: 'Rs 1,200' },
          ]"
          :rentalSummary="{
            days: 8,
            total: 'Rs 86,400',
            breakdown: [
              { label: '8 Days Rental', amount: 'Rs 67,200' },
              { label: 'Passenger Helmet', amount: 'Rs 9600' },
              { label: 'Top Box', amount: 'Rs 9600' },
            ],
          }"
          cancellationNote="Free cancellation until"
          cancellationDeadline="6th May, 23:59 PM"
        />

        <Map
          map-url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.2070127821403!2d73.0897425!3d33.522003000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed2e048746c1%3A0x244a446ba063d544!2sPakistan%20Bikers!5e0!3m2!1sen!2s!4v1745253279331!5m2!1sen!2s"
        />

        <OperatorCard
          :image="pakistanBikersLogo"
          name="Pakistan Bikers"
          rating="4.5"
          reviewScore="4.2"
          :totalReviews="15"
        />

        <OperatingHours hours="8AM - 9PM Monday to Sunday" />

        <ChatWithOperator
          :icon="chatIcon"
          title="Chat with XYZ Rentals"
          message="You can chat with our support team directly after confirming your booking."
        />

        <ProtectedBookingCard
          :icon="protectionIcon"
          title="Secure Payment"z
          message="Your transaction is secured and fully refundable under our protection policy."
        />
      </div>
    </div>

    <FreeCancellation />
  </main>
</template>