<template>
  <div class="container home">
    <button @click="log">log</button>

    <input type="search" v-model="filterBy" />
    <table class="styled-table">
      <thead>
        <tr class="header">
          <td v-for="userKey in usersDataKeys" :key="userKey">
            <span @click="setSort(userKey)">{{ userKey }}</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in modifiedUsers" :key="user" class="header">
          <td v-for="userKey in usersDataKeys">
            {{ keyForDisplay(userKey, user) }}
          </td>
        </tr>
      </tbody>
    </table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="totalPages"
      class="mt-4 paging"
      @current-change="paginate($event)"
      :current-page="currentPage" />
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { wapService } from '../../services/wap.service.local'
import {
  getActionRemoveWap,
  getActionUpdateWap,
  getActionAddWapMsg,
} from '../../store/wap.store'
export default {
  props: {
    usersData: Array,
  },
  data() {
    return {
      sortBy: {
        type: '',
        desc: 1,
      },
      filterBy: '',
      currentPage: 1,
      totalPages: 10000,
      wapToAdd: wapService.getEmptyWap(),
    }
  },
  computed: {
    usersDataKeys() {
      return this.usersData
        .reduce((keys, currUser) => {
          const userKeys = Object.keys(currUser)
          userKeys.forEach((key) => {
            if (!keys.includes(key)) keys.push(key)
          })
          return keys
        }, [])
        .sort()
    },

    modifiedUsers() {
      let users = this.usersData
      console.log(users)
      //Filter
      if (this.filterBy) {
        const regex = new RegExp(this.filterBy, 'i')
        users = users.filter((user) => {
          const userKeys = Object.keys(user)
          return userKeys.some((key) => regex.test(user[key]))
        })
      }

      // Sort
      if (this.sortBy.type) {
        if (this.sortBy.type === 'createdAt') {
          users.sort((u1, u2) => {
            return (u1.createdAt - u2.createdAt) * this.sortBy.desc
          })
        } else {
          users.sort((u1, u2) => {
            return (
              u1[this.sortBy.type].localeCompare(u2[this.sortBy.type]) *
              this.sortBy.desc
            )
          })
        }
      }

      const USERS_PER_PAGE = 5
      this.totalPages = Math.round(users.length / USERS_PER_PAGE)

      //Paginate
      const firstIndex = (this.currentPage - 1) * USERS_PER_PAGE
      const lastIndex = this.currentPage * USERS_PER_PAGE
      users = users.slice(firstIndex, lastIndex)
      return users
    },

    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    waps() {
      return this.$store.getters.waps
    },
  },
  created() {
    this.$store.dispatch({ type: 'loadWaps' })
  },
  methods: {
    keyForDisplay(key, user) {
      let displatedKey = '-'
      if (user[key]) {
        displatedKey = key === 'createdAt' ? this.dateStr(user[key]) : user[key]
      }
      return displatedKey
    },
    dateStr(timeStamp) {
      const date = new Date(timeStamp)
      return `${date.toLocaleDateString(
        'fr'
      )} ${date.getHours()}:${date.getMinutes()} `
    },
    paginate(page) {
      this.currentPage = page
    },
    setSort(sortBy) {
      if (this.sortBy.type === sortBy) this.sortBy.desc *= -1

      this.sortBy.type = sortBy
    },

    async addWap() {
      try {
        await this.$store.dispatch({ type: 'addWap', wap: this.wapToAdd })
        showSuccessMsg('Wap added')
        this.wapToAdd = wapService.getEmptyWap()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add wap')
      }
    },
    async removeWap(wapId) {
      try {
        await this.$store.dispatch(getActionRemoveWap(wapId))
        showSuccessMsg('Wap removed')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove wap')
      }
    },
    async updateWap(wap) {
      try {
        wap = { ...wap }
        wap.price = +prompt('New price?', wap.price)
        await this.$store.dispatch(getActionUpdateWap(wap))
        showSuccessMsg('Wap updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update wap')
      }
    },
    async addWapMsg(wapId) {
      try {
        await this.$store.dispatch(getActionAddWapMsg(wapId))
        showSuccessMsg('Wap msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add wap msg')
      }
    },
    printWapToConsole(wap) {
      console.log('Wap msgs:', wap.msgs)
    },
  },
}
</script>

<style lang="scss">
.header {
  display: flex;
  flex-direction: row;
}
.styled-table {
  display: table;
    table-layout: fixed;
  width: 100%;
  thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }
  th,
  td {
    padding: 12px 15px;
  }
  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr.active-row {
    font-weight: bold;
    background: #F5F6FA;
  }
}
.paging {
  justify-content: end;
}
</style>
