<template>
  <div class="reset-pass-container">
    <div class="reset-header">
      <h2>Reset password</h2>
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
    <p>
      Enter the e-mail address associated with the account. We"ll email a link
      to reset your password.
    </p>
    <div class="form-group">
      <label>Email</label>
      <input type="email" />
    </div>

    <button class="btn">Send reset link</button>
  </div>
</template>
