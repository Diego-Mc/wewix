<template>
  <section class="dashboard-data" v-if="wapData">
    <div class="dashboard-top-div">
      <h2>{{ wapData.name + "'s Dashboard" }}</h2>
      <div class="preview-links">
        <!-- <router-link :to="`/${wapData.name}`">
          <el-button class="view-wap-btn">View Website</el-button>
        </router-link>
        <router-link :to="'/edit/' + wapData._id">
          <button class="edit-wap-btn">Edit Website</button>
        </router-link> -->
        <router-link :to="`/${wapData.name}`" class="preview-btn"
          >VIEW</router-link
        >
        <router-link :to="'/edit/' + wapData._id" class="publish-btn"
          >EDIT</router-link
        >
      </div>
    </div>
    <main class="graph-and-stats-container">
      <app-dashboard-stats v-if="wapData" :wapData="wapData" />
      <app-dashboard-graphs
        v-if="wapData.visits"
        :visitorsData="wapData.visits" />
    </main>
    <app-dashboard-details
      v-if="wapData.usersData.subscriptions"
      :usersData="wapData.usersData.subscriptions" />
    <wap-chat :isOwner="true" :wapId="wapData._id" />
  </section>
</template>

<script>
import Chance from 'chance'
import appDashboardGraphs from '../cmps/app-cmps/app-dashboard-graphs.vue'
import appDashboardDetails from '../cmps/app-cmps/app-dashboard-details.vue'
import appDashboardStats from '../cmps/app-cmps/app-dashboard-stats.vue'
import wapChat from '../cmps/wap-items/wap-chat.vue'
import { utilService } from '../services/util.service'

export default {
  props: {
    wapData: Object,
  },
  created() {},
  computed: {
    getDemoData() {
      var chance = new Chance()
      const demoData = []
      for (var i = 0; i < 1500; i++) {
        demoData.push({
          firstName: chance.name().split(' ')[0],
          lastName: chance.name().split(' ')[0],
          email: chance.email(),
          createdAt: chance
            .date({ year: chance.integer({ min: 2020, max: 2022 }) })
            [Symbol.toPrimitive]('number'),
          msg: chance.sentence({ words: 5 }),
        })
        if (Math.random() < 0.1) demoData[i].addLike = true
        else if (Math.random() < 0.3) demoData[i].isSubscribed = true
        else if (Math.random() < 0.5)
          demoData[i].gender = Math.random() < 0.5 ? 'male' : 'female'
        else if (Math.random() < 0.8)
          demoData[i][Math.random() < 0.5 ? 'isJobAssign' : 'isHobbyAssign'] =
            Math.random() < 0.5
      }
      return demoData
    },
  },
  components: {
    appDashboardGraphs,
    appDashboardDetails,
    appDashboardStats,
    wapChat,
  },
}
</script>

<style lang="scss">
// .dashboard-data {
//   padding: 25px 15px 100px 25px;
// }
// .dashboard-top-div {
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 53px;
//   button {
//     border-radius: 50px;
//   }
//   .edit-wap-btn {
//     background: rgba(0, 194, 166, 0.5);
//     border: 1px solid #eeeeee;
//     color: #ffffff;
//   }
//   .view-wap-btn {
//     background: #ffffff;
//     border: 1px solid #00c2a6;
//     color: #00c2a6;
//     margin-right: 15px;
//   }
// }

// .graph-and-stats-container {
//   display: flex;
//   justify-content: space-between;
// }
</style>
