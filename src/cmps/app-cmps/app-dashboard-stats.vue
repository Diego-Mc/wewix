<template>
  <section class="dashboard-wap-stats">
    <div class="wap-stat-block">Total Views</div>
    <div class="wap-stat-block">Created At</div>
    <div class="wap-stat-block">Total Subscribers</div>
    <div class="wap-stat-block">Conversion Rate</div>
  </section>
</template>

<script>
export default {}
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
    background-color: blue;
    width: 160px;
    height: 160px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 8px;
  }
}
</style>
