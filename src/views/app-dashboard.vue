<template>
  <main class="app-dashboard">
    <section class="dashboard-sidebar">
      <h3 class="my-Sites-header">My Sites</h3>
      <ul class="waps-list">
        <li v-for="wap in userWaps" @click="changeCurrWapData(wap)">
          {{ wap.name }}
        </li>
      </ul>
    </section>
    <router-view v-if="currWapData" :wapData="currWapData"></router-view>
  </main>
</template>

<script>
export default {
  data() {
    return {
      userWaps: null,
      currWapData: null,
    }
  },
  async created() {
    if (!this.loggedinUser || !this.loggedinUser.waps) return
    let waps = await this.getWaps()
  
    this.userWaps = waps
      .filter((wap) => this.loggedinUser.waps.includes(wap._id))
      .map((wap) => {
        console.log(wap.usersData);
        return {
          _id: wap._id,
          name: wap.name,
          usersData: wap.usersData,
          createdAt: 2,
          totalViews: wap.totalViews,
        }
      })
  },
  methods: {
    async getWaps() {
      return await this.$store.dispatch('getWaps')
    },
    changeCurrWapData(wap) {
      this.currWapData = wap
      this.$router.push('/dashboard/' + this.currWapData._id)
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
}
</script>

<!-- 
Diego:
table is too large how do i make it smaller?
-->
<style lang="scss">
.app-dashboard {
  display: grid;
  grid-template-columns: 230px 1fr;
  padding: 20px;
  gap: 23px;
  height: 100vh;

  .dashboard-sidebar {
    background-color: teal;
    height: 100%;
    padding: 30px 5px;

    .my-Sites-header {
      margin-bottom: 30px;
      margin-left: 20px;
      font-size: 18px;
    }

    .waps-list {
      li {
        height: 50px;
        line-height: 16px;
        padding-left: 16px;
        padding-block: 19px;
      }
      li:hover {
        background: #e6f6f4;
        border-radius: 4px;
      }
    }
  }

  .dashboard-data,
  .dashboard-sidebar {
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 6px;
  }

  .dashboard-data {
    padding-inline: 75px;
  }
}
</style>
