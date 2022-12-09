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
            padding: '18px 20px',
            gap: '10px',
          }"
          :opts="wapNames" />
      </section>
      <router-view :wapData="currWapData"></router-view>
      <!-- <wap-chat :options="currWapData.options"/> -->
      <!-- <div style="" v-else>Build a website to see data!</div> -->
    </main>
  </section>
</template>

<script>
import editorBtnGroup from '../cmps/main-editor/editor-items/editor-btn-group.vue'
import mainHeader from '../cmps/app-cmps/main-header.vue'
import wapChat from '../cmps/wap-items/wap-chat.vue'
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

    this.userWaps = await this.getUserWaps()
  },
  methods: {
    handleBtnSelect(ans) {
      this.changeCurrWapData(ans.val)
    },
    getWap() {},
    async getWaps() {
      return await this.$store.dispatch('getWaps')
    },
    async getUserWaps() {
      return await this.$store.dispatch('getUserWaps')
    },
    changeCurrWapData(wap) {
      this.currWapData = wap
      if (wap) this.$router.push('/dashboard/' + this.currWapData._id)
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
