<template>
  <div class="amenities">
    <h2>Amenities <span> at the property</span></h2>
    <div class="amenities-list">
      <ul>
        <li><img :src="img0" alt="" /><span>Restaurant</span></li>
        <li><img :src="img1" alt="" /><span>Room service</span></li>
        <li><img :src="img2" alt="" /><span>Free Parking</span></li>
        <li><img :src="img3" alt="" /><span>Family Friendly</span></li>
      </ul>
      <ul>
        <li><img :src="img4" alt="" /><span>Free Wi-fi</span></li>
        <li><img :src="img5" alt="" /><span>River View</span></li>
        <li><img :src="img6" alt="" /><span>Lobby</span></li>
        <li><a class="view-all" href="">view all amenities</a></li>
      </ul>
    </div>
    <div class="check-in">
      <ul>
        <li>Check-in time: <span>12PM - Anytime</span></li>
        <li>Check-out time: <span>11AM</span></li>
      </ul>
    </div>
  </div>
</template>
