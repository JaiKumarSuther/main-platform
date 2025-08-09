<script setup>
import img0 from '@/assets/images/jazzcash-icon-checkout.svg'
import img1 from '@/assets/images/easypaisa-icon-checkout.svg'
import img2 from '@/assets/images/mastercard-svgrepo-com-1.svg'
import img3 from '@/assets/images/visa-svgrepo-com.svg'
import img4 from '@/assets/images/unionpay.svg'
import img5 from '@/assets/images/hunza-tour.png'
import img6 from '@/assets/images/location-icon.svg'
import img7 from '@/assets/images/duration-icon.svg'
import img8 from '@/assets/images/date-icon-select-details.svg'
import img9 from '@/assets/images/people-icon-checkout-page.svg'
import img10 from '@/assets/images/free-cancellation-icon.svg'

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "../api/axios"; // Adjust if needed

const router = useRouter();

const user = ref({
  full_name: "",
  email: "",
  phone_number: "",
});

const cardNumber = ref("");
const expiry = ref("");
const cvv = ref("");
const cardholderName = ref("");

const userJson = localStorage.getItem("user");
const userId = userJson ? JSON.parse(userJson).user_id : null;

const fetchUser = async () => {
  try {
    const res = await axios.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    user.value = res.data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
  }
};

const handlePayment = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      "/payouts",
      {
        booking_id: "mock-booking-id",
        partner_id: userId,
        amount_due: 1000.0,
        commission_fee: 50.0,
        wht_tax: 25.0,
        final_amount: 925.0,
        payout_status: "pending",
        payout_method: "card",
        payout_date: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Payout created:", response.data);
    alert("Payment and payout request submitted!");
    router.push("/profile/refunds");
  } catch (error) {
    console.error("Error creating payout:", error);
    alert("Failed to process payout.");
  }
};

onMounted(fetchUser);
</script>

<template>
  <main>
    <div class="checkout-container">
      <div class="left-section">
        <div class="form-container">
          <h2>Enter your details</h2>

          <div class="form-group">
            <label>Full name</label>
            <input type="text" :value="user.full_name" readonly />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" :value="user.email" readonly />
          </div>

          <div class="phone-section">
            <div class="form-group">
              <label>Country</label>
              <input type="text" value="Pakistan (+92)" readonly />
            </div>
            <div class="border"></div>
            <div class="form-group">
              <label>Phone number</label>
              <input type="tel" :value="user.phone_number" readonly />
            </div>
          </div>

          <div class="checkbox-group">
            <input type="checkbox" id="promo" checked />
            <label for="promo">
              Send me promotional emails related to discounts, offers, as well
              as other travel inspiration. You can opt out at any time.
            </label>
          </div>
        </div>

        <div class="payment-form">
          <h2>Payment</h2>

          <!-- JazzCash -->
          <label class="payment-option">
            <div class="radio-label">
              <input type="radio" name="payment" />
              <span>JazzCash</span>
            </div>
            <img :src="img0" alt="JazzCash" />
          </label>

          <!-- Easypaisa -->
          <label class="payment-option">
            <div class="radio-label">
              <input type="radio" name="payment" />
              <span>Easypaisa</span>
            </div>
            <img
              :src="img1"
              alt="Easypaisa"
            />
          </label>

          <!-- Credit/Debit Card -->
          <div class="card-section">
            <label class="payment-option card-label">
              <div class="radio-label">
                <input type="radio" name="payment" checked />
                <span>Credit/Debit Card</span>
              </div>
              <div class="card-logos">
                <img
                  :src="img2"
                  alt="MasterCard"
                />
                <img :src="img3" alt="Visa" />
                <img
                  :src="img4"
                  alt="UnionPay"
                  class="union-pay"
                />
              </div>
            </label>

            <div class="form-fields">
              <div class="field">
                <label>Card number</label>
                <input type="text" placeholder="1234 1234 1234 1234" />
              </div>

              <div class="row">
                <div class="field">
                  <label>Expiry</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div class="field">
                  <label>CVV</label>
                  <input type="password" placeholder="•••" />
                </div>
              </div>

              <div class="field">
                <label>Cardholder’s name</label>
                <input type="text" placeholder="" />
              </div>
              <button class="pay-now" @click="handlePayment">
                <img src="" alt="" />
                Pay now
              </button>

              <p class="terms">
                By continuing, you agree to travelninja’s general
                <a href="#">terms and conditions</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="right-section">
        <h2>Your booking</h2>
        <div class="booking-card">
          <div class="image-box">
            <img :src="img5" alt="" />
            <div>
              <h3>9 Days Hunza Valley: A Cultural & Scenic Odyssey</h3>
              <p class="location">
                <img :src="img6" alt="" />From
                <span>Islamabad</span>
              </p>
            </div>
          </div>
          <div class="details">
            <p class="duration">
              <img :src="img7" alt="" /> Duration
            </p>
            <span>14 days</span>
          </div>
          <div class="details">
            <p class="dates">
              <img
                :src="img8"
                alt=""
              />Date
            </p>
            <span>Wed 6 Aug 2025</span>
          </div>
          <div class="details">
            <p class="people">
              <img
                :src="img9"
                alt=""
              />People
            </p>
            <span>2 Adults, 1 Infant</span>
          </div>
          <p class="discount" onclick="openPopup()">Have a discount code?</p>
          <p class="cancellation">
            <img :src="img10" alt="" /> Cancel
            for free until
            <span class="highlight">27 June 2025, 11:59 PM sharp</span>
          </p>
          <p class="total">
            Total
            <span class="total-price"
              >960,000
              <small>Everything included</small>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div id="discountPopup" class="discount-popup">
      <div class="discount-popup-content">
        <div class="apply-discount-header">
          <h2>Apply discount code</h2>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Circle outline -->
            <circle cx="50" cy="50" r="45" stroke="#5A6783" stroke-width="4" />

            <!-- Cross line 1 -->
            <line
              x1="35"
              y1="35"
              x2="65"
              y2="65"
              stroke="#5A6783"
              stroke-width="4"
              stroke-linecap="round"
            />

            <!-- Cross line 2 -->
            <line
              x1="65"
              y1="35"
              x2="35"
              y2="65"
              stroke="#5A6783"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="apply-discount-content">
          <p>Add your discount code to see the reduced price instantly.</p>
          <input type="text" placeholder="ADVENTURE18" id="discountCode" />
        </div>
        <button onclick="applyDiscount()">Apply code</button>
      </div>
    </div>
  </main>
</template>
