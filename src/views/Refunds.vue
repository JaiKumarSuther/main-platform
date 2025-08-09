<template>
  <div class="refunds-container">
    <h2>My payments & refunds</h2>

    <div class="filter-bar">
      <div class="tabs">
        <button class="tab active">Payments</button>
        <button class="tab">Refunds</button>
      </div>
    </div>

    <div class="refunds-table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th class="transaction">Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>25 Sep 2025</td>
            <td class="transaction">TC8214372</td>
            <td class="amount">434,000</td>
            <td class="status">Paid</td>
          </tr>
          <tr>
            <td>2 Nov 2025</td>
            <td class="transaction">TC8284461</td>
            <td class="amount">95,002</td>
            <td class="status">Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
