<template>
  <div class="container home">
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
    <hr />
    <form @submit.prevent="addWap()">
      <h2>Add wap</h2>
      <input type="text" v-model="wapToAdd.vendor" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { wapService } from '../services/wap.service.local'
import {
  getActionRemoveWap,
  getActionUpdateWap,
  getActionAddWapMsg,
} from '../store/wap.store'
export default {
  data() {
    return {
      wapToAdd: wapService.getEmptyWap(),
    }
  },
  computed: {
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
