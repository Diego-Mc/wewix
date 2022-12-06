<template>
  <section class="dashboard-wap-stats">
    <div class="wap-stat-block">
      <h3>Total Views</h3>
      <p class="stat-count">{{ wapData.visits?.length}}</p>
    </div>
    <div class="wap-stat-block">
      <h3>Created At</h3>
      <p class="stat-count">{{ wapData.usersData.subscriptions.length }}</p>
    </div>
    <div class="wap-stat-block">
      <h3>Total Subscribers</h3>
      <p class="stat-count">{{ wapData.usersData.subscriptions.length }}</p>
    </div>
    <div class="wap-stat-block">
      <h3>Conversion Rate</h3>
      <p class="stat-count">{{ wapData.usersData.subscriptions.length }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    wapData: Object,
  },
  created() {
    console.log('wa',this.wapData)
  },
}
</script>

<style lang="scss" scoped>
.dashboard-wap-stats {
  display: grid;
  grid-template-columns: 160px 160px;
  justify-items: center;
  gap: 26px;
  row-gap: 26px;
  .wap-stat-block {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-direction: column;
    background-color: blue;
    width: 160px;
    height: 160px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 8px;
  }
  h3 {
    font-size: 16px;
  }
  .stat-count {
    font-size: 26px;
    font-weight: 600;
  }
}
</style>
