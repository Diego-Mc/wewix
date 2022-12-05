<template>
  <div class="container home" >
    <ul class="wap-list">
      <li v-for="wap in waps" :key="wap._id">
        <p>
          {{ wap.vendor }}
        </p>
        <p>${{ wap.price?.toLocaleString() }}</p>
        <button @click="removeWap(wap._id)">x</button>
        <button @click="updateWap(wap)">Update</button>
        <hr />
        <button @click="addWapMsg(wap._id)">Add wap msg</button>
        <button @click="printWapToConsole(wap)">Print msgs to console</button>
      </li>
    </ul>
    
    <el-pagination
    background
    layout="prev, pager, next"
    :total="totalPages"
    class="mt-4"
    @current-change="paginate($event)"
    :current-page="currentPage"

  />
    <button @click="log">log</button>

    <input type="search" v-model="filterBy">

    <table >
      <thead>
        <tr class="header">
          <td v-for="userKey in usersDataKeys" :key="userKey">
              <span @click="setSort(userKey)">{{userKey}}</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in modifiedUsers" :key="user" class="header">
          <td v-for="userKey in usersDataKeys"> {{(user[userKey] ? user[userKey] : '-')}}</td>
        </tr>
      </tbody>
    </table>
  


    <hr />


    <form @submit.prevent="addWap()">
      <h2>Add wap</h2>
      <input type="text" v-model="wapToAdd.vendor" />
      <button>Save</button>
    </form>
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
    usersData: Array
  },
  data() {
    return {
      sortBy: {
        type: '',
        desc: 1
      },
      filterBy: '',
      currentPage: 1,
      totalPages: (this.usersData.length / 5),
      wapToAdd: wapService.getEmptyWap(),
    }
  },
  computed: {
    usersDataKeys() {
      
        return this.usersData.reduce((keys, currUser) => {
            const userKeys = Object.keys(currUser)
            userKeys.forEach(key => {
              if (!keys.includes(key)) keys.push(key)
            })
            return keys
        }, []).sort()
    },



    modifiedUsers() {
      let users = this.usersData

      //Filter
      if (this.filterBy) {
        const regex = new RegExp(this.filterBy, 'i')
        users = users.filter(user => {
          const userKeys = Object.keys(user)
          return userKeys.some(key => regex.test(user[key]))
        })
      }

      // Sort
      if (this.sortBy.type) {
        if (this.sortBy.type === 'createdAt') {
          users.sort((u1, u2)=> {
            return (u1.createdAt - u2.createdAt) * this.sortBy.desc
          })
        } else {
          users.sort((u1, u2)=> {
            return (u1[this.sortBy.type].localeCompare(u2[this.sortBy.type]) * this.sortBy.desc)
          })
        }
      }

      this.totalPages = users.length / 5

      //Paginate
      const USERS_PER_PAGE = 5
      const firstIndex = (this.currentPage - 1) * USERS_PER_PAGE
      const lastIndex = this.currentPage * USERS_PER_PAGE
      console.log('firstIndex, lastIndex:', firstIndex, lastIndex)
      users = users.slice(firstIndex, lastIndex)
      console.log("🚀 ~ file: app-dashboard-details.vue:128 ~ modifiedUsers ~ users", users)
      
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

<style>
.header {
  display: flex;
  flex-direction: row;
}

</style>
