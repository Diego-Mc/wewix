<template>
  <section class="dashboard-wap-stats">
    <div class="wap-stat-block card">
      <i class="bi bi-eyeglasses"></i>
      <h3>Total Views</h3>
      <p class="stat-count">{{ wapData.visits ? wapData.visits.length : 1 }}</p>
    </div>
    <div class="wap-stat-block card">
      <i class="bi bi-calendar-event"></i>
      <h3>Created At</h3>
      <p class="stat-count">{{ dateStr }}</p>
    </div>
    <div class="wap-stat-block card">
      <i class="bi bi-briefcase"></i>
      <h3>Total Subscribers</h3>
      <p class="stat-count">{{ wapData.usersData.subscriptions.length }}</p>
    </div>
    <div class="wap-stat-block card">
      <i class="bi bi-bank"></i>
      <h3>Conversion Rate</h3>
      <p class="stat-count">
        {{ conversionRate }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    wapData: Object,
  },
  computed: {
    dateStr() {
      return new Date(this.wapData.createdAt).toLocaleDateString('fr')
    },
    conversionRate() {
      let rate =
        (this.wapData.usersData.subscriptions.length /
          this.wapData.visits?.length) *
        100
      if (isNaN(rate)) rate = 0
      return rate.toFixed(2) + '%'
    },
  },
}
</script>

<style lang="scss" scoped>
// .dashboard-wap-stats {
//   display: grid;
//   grid-template-columns: 160px 160px;
//   justify-items: center;
//   gap: 26px;
//   row-gap: 26px;
//   .wap-stat-block {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 10px;
//     flex-direction: column;
//     background-color: blue;
//     width: 160px;
//     height: 160px;
//     background: #ffffff;
//     border: 1px solid #eeeeee;
//     border-radius: 8px;
//   }
//   h3 {
//     font-size: 16px;
//   }
//   .stat-count {
//     font-size: 26px;
//     font-weight: 600;
//   }
// }
</style>
