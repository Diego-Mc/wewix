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
  return storageService.get(WAPS_KEY, wapId)
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
; (async () => {
  const waps = await wapService.query()
  if (!waps || !waps.length) await storageService.post(WAPS_KEY, wapsModel)
  waps.findIndex(wap => wap._id === '5e28393890dd7201a06d4e44')
  if (waps < -1) waps.push(
    {
      _id: '5e28393890dd7201a06d4e44',
      name: 'HairDresser Baluta Marketing Site',
      imgUrl:
        'http://res.cloudinary.com/webify/image/upload/v1580021948/coffe_yi0yzf.png',
      createdBy: {
        _id: '5e26e0b718a0891d4c995527',
        fullname: 'Hekro Special',
        imgUrl: 'img.jpg',
      },
      usersData: {
        contacts: [
          { email: 'user@user.com', msg: 'Please send me stuff', at: 123 },
        ],
        subscriptions: [{ email: 'user@user.com', at: 123 }],
      },
      isOnline: false,
      cmps: [getCmp('wap-header', 1), getCmp('wap-hero', 1), getCmp('wap-section', 1), getCmp('wap-cards', 1),],
    }
  )
})()
