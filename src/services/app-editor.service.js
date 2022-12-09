export const appEditorService = {
  getEmptyWap,
  saveToStorage,
  loadFromStorage,
  addOverlays,
}

function getEmptyWap() {
  return {
    name: '',
    imgUrl: '',
    createdBy: {
      // _id: '',
      // fullname: '',
      // imgUrl: '',
    },
    usersData: {
      contacts: [],
      subscriptions: [],
    },
    isOnline: false,
    cmps: [],
  }
}

function saveToStorage(key, val) {
  localStorage[key] = JSON.stringify(val)
}
function loadFromStorage(key) {
  const str = localStorage.getItem(key)
  return JSON.parse(str)
}

function _removeOverlays(elMainWap) {
  elMainWap
    .querySelectorAll('[data-draggable],[contenteditable="true"]')
    .forEach((el) => {
      el?.elOverlay?.remove()
      el.elOverlay = null
    })
}

function addOverlays(elMainWap) {
  _removeOverlays(elMainWap)
  elMainWap
    .querySelectorAll('[data-draggable]:hover')
    .forEach((elDraggable) => {
      _addOverlay(elDraggable, '#00e8c511', '#00e8c555')
      elDraggable
        .querySelectorAll("[contenteditable='true']:hover")
        .forEach((elEditable) => _addOverlay(elEditable, '#00e8c533'))
    })
}

function _addOverlay(el, backgroundColor, outlineColor) {
  if (el.elOverlay) {
    el.elOverlay.remove()
    el.elOverlay = null
  }
  const elOverlay = document.createElement('div')
  elOverlay.setAttribute('class', 'overlay')

  let rect = el.getBoundingClientRect()

  let offset = {
    top: rect.top,
    left: rect.left,
  }

  elOverlay.style.zIndex = 10
  elOverlay.style.position = 'absolute'
  backgroundColor && (elOverlay.style.backgroundColor = backgroundColor)
  outlineColor && (elOverlay.style.outline = `2px solid ${outlineColor}`)
  elOverlay.style.top = offset.top + 'px'
  elOverlay.style.left = offset.left + 'px'
  elOverlay.style.width = el.offsetWidth + 'px'
  elOverlay.style.height = el.offsetHeight + 'px'
  elOverlay.style.pointerEvents = 'none'

  document.body.prepend(elOverlay)

  el.elOverlay = elOverlay
}
