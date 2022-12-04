import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const WAPS_KEY = 'wapDB'

export const wapService = {
  query,
  getById,
  save,
  remove,
  getEmptyWap,
  addWapMsg,
  getByName
}

window.cs = wapService

async function query(filterBy = { txt: '', price: 0 }) {
  var waps = await storageService.query(WAPS_KEY)

  return waps
}

function getById(wapId) {
  return storageService.get(WAPS_KEY, wapId)
}

async function getByName(wapName) {
  try {
    const res = await storageService.getByName(WAPS_KEY, wapName)
    return res
  } catch (err) {
    console.log(`${err} while getByName From storageService`);
    throw new Error(`Couldn't retrieve Wap from storageService`)
  }
}

async function remove(wapId) {
  await storageService.remove(WAPS_KEY, wapId)
}

async function save(wap) {
  var savedWap
  if (wap._id) {
    savedWap = await storageService.put(WAPS_KEY, wap)
  } else {
    // Later, owner is set by the backend
    wap.owner = userService.getLoggedinUser()
    wap._id = utilService.makeId()
    savedWap = await storageService.post(WAPS_KEY, wap)
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
  await storageService.put(WAPS_KEY, wap)

  return msg
}

function getEmptyWap() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

// TEST DATA
