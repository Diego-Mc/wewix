export const appEditorService = {
  getEmptyWap,
  saveToStorage,
  loadFromStorage,
  addOverlays,
  addSelectionListeners,
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
    visits:[{createdAt:new Date().now}],
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
    .querySelectorAll('[data-draggable],[contenteditable="true"],button,img')
    .forEach((el) => {
      el?.elOverlay?.remove()
      el.elOverlay = null
    })
}

function addOverlays(elMainWap) {
  _removeOverlays(elMainWap)
  elMainWap
    .querySelectorAll('[data-draggable]:not(.selected):hover')
    .forEach((elDraggable) => {
      _addOverlay(elDraggable, '#00e8c522', '#00e8c555')
      elDraggable
        .querySelectorAll(
          ":is([contenteditable='true'],button,img):not(.selected):hover"
        )
        .forEach((elEditable) => _addOverlay(elEditable, '#00e8c522'))
    })
}

function addSelectionListeners(elMainWap) {
  elMainWap
    .querySelectorAll('[data-draggable],[contenteditable="true"],img,button')
    .forEach((elSelectable) => {
      // elSelectable.removeEventListener('click', _selectEl)
      elSelectable.addEventListener('mousedown', (e) => {
        e.stopPropagation()
        _selectEl(elSelectable, elMainWap)
      })
    })
}

function _selectEl(el, elMainWap) {
  elMainWap
    .querySelectorAll('[data-draggable],[contenteditable="true"],img,button')
    .forEach((elSelectable) => {
      elSelectable.classList.remove('selected')
    })
  el.classList.add('selected')
  console.log('added class', el)
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
