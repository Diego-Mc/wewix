<template>
  <section class="dashboard-page">
    <main-header />
    <main class="app-dashboard">
      <section class="dashboard-sidebar">
        <h3 class="my-sites-header">My Sites</h3>
        <editor-btn-group
          :info="{ key: 'wap' }"
          dir="column"
          @setVal="handleBtnSelect"
          v-model="currWapData"
          :style="{
            margin: '4px',
            justifyContent: 'flex-start',
            padding: '18px 16px',
            gap: '10px',
          }"
          :opts="wapNames" />
      </section>
      <router-view :wapData="currWapData"></router-view>
      <wap-chat :owner="$store.getters.loggedinUser" />
      <!-- <wap-chat :options="currWapData._id" /> -->
      <!-- <wap-chat :wapId="wapData._id" /> -->
      <!-- <div style="" v-else>Build a website to see data!</div> -->
    </main>
  </section>
  <!-- <section v-if="false" class="skeleton">
    <div class="header"></div>
    <div class="sidebar"></div>
    <div class="main">
      <div class="header"></div>
      <div class="graph-and-stats-container">
        <div class="stats">
          <div class="wap-stat-block">
            <i></i>
            <h3></h3>
            <div class="stat-count"></div>
          </div>
          <div class="wap-stat-block">
            <i></i>
            <h3></h3>
            <div class="stat-count"></div>
          </div>
          <div class="wap-stat-block">
            <i></i>
            <h3></h3>
            <div class="stat-count"></div>
          </div>
          <div class="wap-stat-block">
            <i></i>
            <h3></h3>
            <div class="stat-count"></div>
          </div>
        </div>
        <div class="graph">
          <div class="dropdowns"></div>
          <div class="graph-wrapper"></div>
        </div>
      </div>
      <div class="table-area">
        <div class="search"></div>
        <div class="btn"></div>
        <div class="table"></div>
      </div>
    </div>
  </section> -->
</template>

<script>
import editorBtnGroup from '../cmps/main-editor/editor-items/editor-btn-group.vue'
import mainHeader from '../cmps/app-cmps/main-header.vue'
// import wapChat from '../cmps/wap-items/wap-chat.vue'
import wapChat from '../cmps/wap-items/wap-chat1.vue'
import { socketService } from '../services/socket.service.js'
import { utilService } from '../services/util.service'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      userWaps: null,
      currWapData: null,
    }
  },

  async created() {
    if (!this.loggedinUser) return this.$router.push('/')
    if (!this.loggedinUser.waps) return

    const waps = await this.getUserWaps()
    this.userWaps = utilService.deepCopy(waps)

    socketService.on('formSent', (sentMsg) => {
      if (sentMsg.wapOwnerId === this.loggedinUser._id) {
        const updatedWap = this.userWaps.find(
          (wap) => wap._id === sentMsg.wapId
        )
        const { wapOwnerId, wapId, ...newMsg } = sentMsg
        updatedWap.usersData.subscriptions.unshift(newMsg)
      }
      ElMessage({
        message: `You have a new lead from site '${sentMsg.wapName}''`,
        type: 'success',
      })
    })
    // console.log('id', waps[0]._id)
    // this.$router.push(`/dashboard/${waps[0]._id}`)
  },
  unmounted() {
    socketService.off('formSent')
  },
  methods: {
    handleBtnSelect(ans) {
      this.changeCurrWapData(ans.val)
    },
    async getUserWaps() {
      return await this.$store.dispatch('getUserWaps')
    },
    changeCurrWapData(wap) {
      console.log(wap)
      this.currWapData = wap
      if (this.currWapData && this.currWapData._id)
        this.$router.push('/dashboard/' + this.currWapData._id)
      else this.$router.push('/dashboard')
    },
    getDemoData() {
      var chance = new Chance()
      const demoData = []
      for (var i = 0; i < 150; i++) {
        demoData.push({
          firstName: chance.name().split(' ')[0],
          lastName: chance.name().split(' ')[0],
          email: chance.email(),
          createdAt: chance
            .date({ year: chance.integer({ min: 2020, max: 2022 }) })
            [Symbol.toPrimitive]('number'),
          msg: chance.sentence({ words: 5 }),
        })
      }

      return demoData
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    wapNames() {
      return this?.userWaps?.map((wap) => ({
        val: wap,
        icon: 'file-bar-graph-fill',
        text: wap.name,
      }))
    },
  },
  components: {
    editorBtnGroup,
    wapChat,
    mainHeader,
  },
}
</script>

<!--
Diego:
table is too large how do i make it smaller?
-->
<style lang="scss">
// .app-dashboard {
//   display: grid;
//   grid-template-columns: 230px 1fr;
//   padding: 20px;
//   gap: 23px;
//   height: 100vh;

//   .dashboard-sidebar {
//     background-color: teal;
//     height: 100%;
//     padding: 30px 5px;

//     .my-Sites-header {
//       margin-bottom: 30px;
//       margin-left: 20px;
//       font-size: 18px;
//     }

//     .waps-list {
//       li {
//         height: 50px;
//         line-height: 16px;
//         padding-left: 16px;
//         padding-block: 19px;
//       }
//       li:hover {
//         background: #e6f6f4;
//         border-radius: 4px;
//       }
//     }
//   }

//   .dashboard-data,
//   .dashboard-sidebar {
//     background: #ffffff;
//     border: 1px solid #eeeeee;
//     border-radius: 6px;
//   }

//   .dashboard-data {
//     padding-inline: 75px;
//   }
// }
</style>
