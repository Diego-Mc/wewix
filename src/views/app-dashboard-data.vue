<template>
  <section class="dashboard-data" v-if="wapData">
    <div class="dashboard-top-div">
      <div class="title">
        <i
          class="bi bi-chevron-left s-only back-to-sites-btn"
          @click="$emit('back-to-sidebar')"></i>
        <h2 class="s-hide">
          {{ wapData.name + "'s Dashboard" }}
        </h2>
        <h2 class="s-only">
          {{ wapData.name }}
        </h2>
        <i class="bi bi-link-45deg site-link" @click="copySiteUrl"></i>
      </div>
      <div class="preview-links">
        <!-- <router-link :to="`/${wapData.name}`">
          <el-button class="view-wap-btn">View Website</el-button>
        </router-link>
        <router-link :to="'/edit/' + wapData._id">
          <button class="edit-wap-btn">Edit Website</button>
        </router-link> -->
        <button @click="removeSite" class="remove-btn">Deleted site</button>
        <button @click="removeSite" class="remove-btn">Delete site</button>

        <router-link :to="`/${wapData.name}`" class="preview-btn s-hide"
          >VIEW WEBSITE</router-link
        >
        <router-link :to="'/edit/' + wapData._id" class="publish-btn s-hide"
          >EDIT WEBSITE</router-link
        >

        <el-dropdown trigger="click">
          <span class="el-dropdown-link s-only">
            Actions&nbsp;<i class="bi bi-chevron-down"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push(`/${wapData.name}`)"
                >View website</el-dropdown-item
              >
              <el-dropdown-item @click="$router.push('/edit/' + wapData._id)"
                >Edit website</el-dropdown-item
              >
              <el-dropdown-item @click="removeSite"
                >Delete website</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <main class="graph-and-stats-container">
      <app-dashboard-stats v-if="wapData" :wapData="wapData" />
      <app-dashboard-graphs
        :visitorsData="
          wapData.visits ? wapData.visits : [{ createdAt: Date.now() }]
        " />
    </main>
    <app-dashboard-details
      v-if="wapData.usersData.subscriptions"
      :usersData="wapData.usersData.subscriptions"
      :wapName="wapData.name"
      />
    <!-- <wap-chat :owner="$store.getters.loggedinUser" :wapIds="" :wapId="wapData._id" /> -->
  </section>
</template>

<script>
import Chance from 'chance'
import appDashboardGraphs from '../cmps/app-cmps/app-dashboard-graphs.vue'
import appDashboardDetails from '../cmps/app-cmps/app-dashboard-details.vue'
import appDashboardStats from '../cmps/app-cmps/app-dashboard-stats.vue'
import wapChat from '../cmps/wap-items/wap-chat.vue'
import { utilService } from '../services/util.service'
import { socketService } from '../services/socket.service'
import { ElMessage } from 'element-plus'

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
  methods: {
    copySiteUrl() {
      const url = `${window.location.origin}/#/${this.wapData.name}`
      utilService.copyToClipboard(url)
      ElMessage({
        message: 'Website link copied to your clipboard.',
        type: 'success',
      })
    },
    removeSite() {
      this.$store.dispatch('removeWap', { wapId: this.wapData._id })
      this.$emit('wapRemoved', this.wapData._id)
      this.$router.push('/dashboard')
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

<style lang="scss"></style>
