import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const WAPS_KEY = 'wapDB'
import wapsModel from './wap-model'

export const wapService = {
  query,
  getById,
  save,
  remove,
  getEmptyWap,
  addWapMsg,
}

window.cs = wapService

async function query(filterBy = { txt: '', price: 0 }) {
  var waps = await storageService.query(WAPS_KEY)
  if (!waps || !waps.length) waps = wapsModel

  return waps
}

function getById(wapId) {
  return storageService.get(STORAGE_KEY, wapId)
}

async function remove(wapId) {
  await storageService.remove(STORAGE_KEY, wapId)
}

async function save(wap) {
  var savedWap
  if (wap._id) {
    savedWap = await storageService.put(STORAGE_KEY, wap)
  } else {
    // Later, owner is set by the backend
    wap.owner = userService.getLoggedinUser()
    savedWap = await storageService.post(STORAGE_KEY, wap)
  }
  return savedWap
}

async function addWapMsg(wapId, txt) {
  // Later, this is all done by the backend
  const wap = await getById(wapId)
  if (!wap.msgs) wap.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  wap.msgs.push(msg)
  await storageService.put(STORAGE_KEY, wap)

  return msg
}

function getEmptyWap() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

// TEST DATA
// ; (async () => {
//   await storageService.post(STORAGE_KEY, {
//     vendor: 'Subali Karov 1',
//     price: 180,
//   })
//   await storageService.post(STORAGE_KEY, {
//     vendor: 'Subali Rahok 2',
//     price: 240,
//   })
// })()
