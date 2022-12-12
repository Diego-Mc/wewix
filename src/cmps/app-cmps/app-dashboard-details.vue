<template>
  <section class="leads card" style="padding: 20px">
    <div class="table-options">
      <div class="table-sorting">
        <el-input
          class="table-search"
          v-model="filterBy"
          size="small"
          placeholder="Type to search" />
        <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next"
          :page-count="totalPages"
          :pager-count="5"
          class="mt-4 paging"
          @current-change="paginate($event)"
          :current-page="currentPage" />
        <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next"
          :page-count="totalPages"
          :pager-count="1"
          class="mt-4 paging mb-only"
          @current-change="paginate($event)"
          :current-page="currentPage" />
      </div>
      <button @click="downloadCsv" class="csv-download">DOWNLOAD CSV</button>
    </div>
    <el-table class="" :data="modifiedUsers" style="width: 100%" flexible>
      <el-table-column
        v-for="userKey in usersDataKeys"
        :key="userKey"
        :fixed="userKey === 'createdAt'"
        :prop="userKey"
        :label="modifiedUserKey(userKey)"
        class="leads-table"
        sortable />
    </el-table>
  </section>
</template>

<script>
import { isTemplateNode } from '@vue/compiler-core'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { utilService } from '../../services/util.service'
import { wapService } from '../../services/wap.service.local'
import {
  getActionRemoveWap,
  getActionUpdateWap,
  getActionAddWapMsg,
} from '../../store/wap.store'
export default {
  props: {
    usersData: Array,
    wapName: String
  },
  data() {
    return {
      sortBy: {
        type: '',
        desc: 1,
      },
      filterBy: '',
      currentPage: 1,
      totalPages: 100,
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
      let users = JSON.parse(JSON.stringify(this.usersData))

      users.sort((a, b) => b.createdAt - a.createdAt)
      users.forEach((user) => {
        user.createdAt = this.getDate(user.createdAt)
      })
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
          console.log(users)
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

      const USERS_PER_PAGE = 10
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
  methods: {
    modifiedUserKey(userKey){
      if(userKey === 'createdAt') return 'Date'
      return userKey
    },
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

    getDate(date) {
      const createdAt = new Date(date)
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      // If Pass By Year
      if (new Date().getFullYear() - createdAt.getFullYear() > 1) {
        return monthNames[createdAt.getMonth()] + ' ' + createdAt.getFullYear()
        // If Pass By Less Then 24 Hours
      } else if (new Date() - createdAt < 1000 * 60 * 60 * 24) {
        const hour =
          createdAt.getHours() < 10
            ? '0' + createdAt.getHours()
            : createdAt.getHours()
        const minutes =
          createdAt.getMinutes() < 10
            ? '0' + createdAt.getMinutes()
            : createdAt.getMinutes()
        return hour + ':' + minutes
      } else {
        return monthNames[createdAt.getMonth()] + ' ' + (createdAt.getDay() + 1)
      }
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
    downloadCsv() {
      if (!this.usersData) return 
      const userDataCsv = utilService.convertToCSV(this.usersData)
      const anchor = document.createElement('a');
      anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(userDataCsv);
      anchor.target = '_blank';
      anchor.download = `${this.wapName}-usersData.csv`;
      anchor.click();
    }
  },


}
</script>

<style lang="scss">
// .header {
//   display: flex;
//   flex-direction: row;
// }
// .styled-table {
//   display: table;
//   table-layout: fixed;
//   width: 100%;
//   thead tr {
//     background-color: #009879;
//     color: #ffffff;
//     text-align: left;
//   }
//   th,
//   td {
//     padding: 12px 15px;
//   }
//   tbody tr {
//     border-bottom: 1px solid #dddddd;
//   }

//   tbody tr:nth-of-type(even) {
//     background-color: #f3f3f3;
//   }

//   tbody tr.active-row {
//     font-weight: bold;
//     background: #f5f6fa;
//   }
// }
// .paging {
//   justify-content: end;
// }
</style>
