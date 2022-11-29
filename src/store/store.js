import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { wapStore } from './wap.store.js'
import { reviewStore } from './review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    wapStore,
    reviewStore,
  },
  state: {},
  mutations: {},
  actions: {},
})
