<script setup>
import SidebarMobile from "../components/UI/SidebarMobile.vue";
import HotelListingDetails from "../components/UI/HotelListingDetails.vue";
import HotelHeader from "../components/UI/HotelHeader.vue";
import SelectRoom from "../components/UI/SelectRoom.vue";
import MoreDetails from "../components/UI/MoreDetails.vue";
import FAQs from "../components/UI/FAQs.vue";
import ReviewCount from "../components/UI/ReviewCount.vue";

const rooms = [
  {
    image: '@/assets/images/hotel1.jpg',
    title: 'Deluxe Room',
    sleeps: 'Sleeps 3',
    bedType: '1 Single Bed · 1 King Bed',
    roomSize: '159 sq ft',
    cancellationDate: '6th May',
    price: 'PKR 4840',
    nights: '2',
    note: 'Breakfast included'
  },
  {
    image: '@/assets/images/avatar.png',
    title: 'Deluxe Room',
    sleeps: 'Sleeps 3',
    bedType: '1 Single Bed · 1 King Bed',
    roomSize: '159 sq ft',
    cancellationDate: '6th May',
    price: 'PKR 4840',
    nights: '2',
    note: 'Breakfast included'
  },
  // Add more objects if needed
]
</script>

<template>
  <main>
    <SidebarMobile />
    <HotelListingDetails
      title="North View Hotel"
      price="PKR 4840"
      location="Hunza"
      mainImage="@/assets/images/northview.png"
      :galleryImages="[
        '@/assets/images/avatar.png',
        '@/assets/images/avatar.png',
        '@/assets/images/avatar.png',
        '@/assets/images/avatar.png',
      ]"
    />

    <div class="hotel-info-details">
      <div class="hotel-info">
        <HotelHeader
          location="Hunza"
          mapUrl="https://www.google.com/maps/embed?pb=..."
          :amenitiesList1="[
            { icon: '@/assets/images/resturant icon.svg', label: 'Restaurant' },
            {
              icon: '@/assets/images/room service icon.svg',
              label: 'Room service',
            },
            {
              icon: '@/assets/images/free-parking-icon.svg',
              label: 'Free Parking',
            },
            { icon: '@/assets/images/for-ages-icon.svg', label: 'Family Friendly' },
          ]"
          :amenitiesList2="[
            {
              icon: '@/assets/images/Places icon in mobile menu.svg',
              label: 'Free Wi-fi',
            },
            { icon: '@/assets/images/river view icon.svg', label: 'River View' },
            { icon: '@/assets/images/activity type icon.svg', label: 'Lobby' },
          ]"
          checkInTime="12PM - Anytime"
          checkOutTime="11AM"
        />

        <SelectRoom />
        <MoreDetails />
        <FAQs
          :items="[
            {
              question: 'What if the car breaks down during my trip?',
              answer:
                'Call our 24/7 support. Roadside assistance or a replacement will be arranged.',
            },
            {
              question: 'What documents do I need to rent a car?',
              answer: 'You need CNIC/passport and a valid driving license.',
            },
            {
              question:
                'Is there a security deposit required, and how much is it?',
              answer: 'Yes. Details vary by vehicle type and rental duration.',
            },
            {
              question:
                'Can I pick up the car from one location and return it to another?',
              answer: 'Yes, with prior coordination.',
            },
          ]"
        />
        <ReviewCount />
      </div>
    </div>

    <div class="mobile-sticky-panel hotel-select-details">
      <div class="left-text">
        <span>Free cancellation</span><br />
        <small>until 8 Feb</small>
      </div>
      <a href="#details" class="select-button">Select Details</a>
    </div>
  </main>
</template>
