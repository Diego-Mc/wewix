import { wapService } from '../services/wap.service.js'

export function getActionRemoveWap(wapId) {
  return {
    type: 'removeWap',
    wapId,
  }
}
export function getActionAddWap(wap) {
  return {
    type: 'addWap',
    wap,
  }
}
export function getActionUpdateWap(wap) {
  return {
    type: 'updateWap',
    wap,
  }
}

export function getActionAddWapMsg(wapId) {
  return {
    type: 'addWapMsg',
    wapId,
    txt: 'Stam txt',
  }
}

export const wapStore = {
  state: {
    waps: [],
    editedWap: null,
    currWap: null,
    isEditMode: true, //TODO: change to be dynamic
    isMobileEdit: false,
  },

  getters: {
    waps({ waps }) {
      return waps
    },
    editedWap({ editedWap }) {
      return editedWap
    },
    isEditMode({ isEditMode }) {
      return isEditMode
    },
    isMobileEdit({ isMobileEdit }) {
      return isMobileEdit
    },
  },

  mutations: {
    setCurrWap(state, { wap }) {
      state.setCurrWap = wap
    },
    setEditMode(state, { isEditMode }) {
      state.isEditMode = isEditMode
    },
    setMobileEdit(state, { isMobileEdit }) {
      state.isMobileEdit = isMobileEdit
    },
    addInfo(state, { isEditMode }) {
      console.log(state.editedWap)
    },
    setEditedWap(state, { wap }) {
      state.editedWap = wap
    },
    setWaps(state, { waps }) {
      state.waps = waps
    },
    addWap(state, { wap }) {
      state.waps.push(wap)
    },
    // updateWap(state, { wap }) {
    //   const idx = state.waps.findIndex((c) => c.id === wap._id)
    //   state.waps.splice(idx, 1, wap)
    // },
    removeWap(state, { wapId }) {
      state.waps = state.waps.filter((wap) => wap._id !== wapId)
    },
    addWapMsg(state, { wapId, msg }) {
      const wap = state.waps.find((wap) => wap._id === wapId)
      if (!wap.msgs) wap.msgs = []
      wap.msgs.push(msg)
    },
  },
  actions: {
    async getWaps(context) {
      const waps = await wapService.query()
      context.commit({ type: 'setWaps', waps })
      return waps
    },

    async getUserWaps(context) {
      const userWaps = await wapService.getUserWaps(
        context.getters.loggedinUser.waps
      )
      return userWaps
    },

    async getWap(context, { id }) {
      const wap = await wapService.getById(id)
      context.commit({ type: 'setEditedWap', wap })
      return wap
    },

    //Todo
    // async getWapByName(context, { wapName }) {
    //   const waps = await wapService.query()
    //   return waps.find(wap => {
    //     return wap.name === wapName
    //   })
    // },
    async getWapByName(context, { wapName }) {
      const wap = await wapService.getByName(wapName)
      context.commit({ type: 'setEditedWap', wap })
      return wap
    },

    async updateWap(context, { wap }) {
      try {
        const updatedWap = await wapService.save(wap)
        context.commit({ type: 'setEditedWap', wap: updatedWap })
        console.log('wap saved in backend')
        return updatedWap._id
      } catch {
        console.log('err: couldnt save wap')
      }
    },
    async addWap(context, { wap }) {
      try {
        wap = await wapService.save(wap)
        context.commit(getActionAddWap(wap))
        return wap
      } catch (err) {
        console.log('wapStore: Error in addWap', err)
        throw err
      }
    },
    async loadWaps(context) {
      try {
        const waps = await wapService.query()
        context.commit({ type: 'setWaps', waps })
      } catch (err) {
        console.log('wapStore: Error in loadWaps', err)
        throw err
      }
    },

    async removeWap(context, { wapId }) {
      try {
        await wapService.remove(wapId)
        context.commit(getActionRemoveWap(wapId))
      } catch (err) {
        console.log('wapStore: Error in removeWap', err)
        throw err
      }
    },

    async addWapMsg(context, { wapId, txt }) {
      try {
        const msg = await wapService.addWapMsg(wapId, txt)
        context.commit({ type: 'addWapMsg', wapId, msg })
      } catch (err) {
        console.log('wapStore: Error in addWapMsg', err)
        throw err
      }
    },
  },
}
