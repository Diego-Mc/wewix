import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { wapStore } from './wap.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    wapStore,
  },
  state: {
    isLoading: false,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {},
})
