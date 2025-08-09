<template>
  <footer>
    <div class="footer-container">
      <div class="footer-links">
        <div class="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Career</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Legal notice</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Terms & conditions</a></li>
            <li><a href="#">Refunds</a></li>
            <li><a href="#">Cancellations</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Partners</h3>
          <ul>
            <li><a href="#">Become a partner</a></li>
            <li><a href="#">Partner portal</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Trust & Safety</h3>
          <ul>
            <li><a href="#">Why book with us?</a></li>
            <li><a href="#">Service protection policy</a></li>
          </ul>
        </div>
        <div class="footer-column newsletter">
          <h3>Subscribe to our newsletter</h3>
          <input type="email" placeholder="iamwamiqahmed@gmail.com" />
        </div>
      </div>

      <div class="footer-bottom">
        <div class="language-selection">
          <h4>Select language</h4>
          <button>english</button>
          <button>urdu</button>
        </div>
        <div class="social-media">
          <h4>Follow us</h4>
          <a href="#"><img :src="img0" alt="Facebook" /></a>
          <a href="#"><img :src="img1" alt="Instagram" /></a>
          <a href="#"><img :src="img2" alt="Twitter" /></a>
          <a href="#"><img :src="img3" alt="YouTube" /></a>
        </div>
        <div class="payment-methods">
          <h4>Payment methods</h4>
          <img :src="img4" alt="Mastercard" />
          <img :src="img5" alt="Visa" />
          <img :src="img6" alt="UnionPay" />
          <img :src="img7" alt="Easypaisa" />
          <img :src="img8" alt="JazzCash" />
          <img :src="img9" alt="Google Pay" />
        </div>
        <div class="currency">
          <h4>Currency</h4>
          <div class="currency-dropdown">
            <span>USD</span>
            <img :src="img10" alt="Dropdown Arrow" />
          </div>
        </div>
        <div class="branding">
          <div class="logo">
            <img :src="img11" alt="Travel Ninja Logo" />
            travelninja
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import img0 from '@/assets/images/facebook-icon-footer.svg'
import img1 from '@/assets/images/instagram-icon-footer.svg'
import img2 from '@/assets/images/twitter-icon-footer.svg'
import img3 from '@/assets/images/youtube-icon-footer.svg'
import img4 from '@/assets/images/mastercard-svgrepo-com-1.svg'
import img5 from '@/assets/images/visa-svgrepo-com.svg'
import img6 from '@/assets/images/unionpay.svg'
import img7 from '@/assets/images/easypaisa.svg'
import img8 from '@/assets/images/jazzcash.svg'
import img9 from '@/assets/images/google-pay.svg'
import img10 from '@/assets/images/dropdown-toggle.svg'
import img11 from '@/assets/images/ninja-logo.svg'

// No script logic yet
</script>
