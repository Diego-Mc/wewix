import { createApp } from 'vue'

// Register the component globally

import { router } from './router.js'
import { store } from './store/store.js'

import Notifications from '@kyvg/vue3-notification'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Skeletor } from 'vue-skeletor'
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'

import VueScrollTo from 'vue-scrollto'
import { utilService } from './services/util.service.js'

const supportsContainerQueries = 'container' in document.documentElement.style
if (!supportsContainerQueries) {
  import('https://cdn.skypack.dev/container-query-polyfill')
}

// window.z_index = 10
// const addOverlay = function (e, ev) {
//   // console.log('sdfsdfsd', e)
//   // ev && ev.stopPropagation()
//   if (e.overlayEl) {
//     e.overlayEl.remove()
//     e.overlayEl = null
//   }
//   // removeOverlays()
//   const el = document.createElement('div')
//   el.setAttribute('class', 'overlay')

//   let rect = e.getBoundingClientRect()

//   let offset = {
//     top: rect.top,
//     left: rect.left,
//   }

//   // border: 2px solid #459fed;
//   //   background: rgba(69,159,237,.3);
//   el.style.zIndex = window.z_index
//   el.style.position = 'absolute'
//   // el.style.backgroundColor = '#e6f6f4'
//   // el.style.backgroundColor = '#00c2a611'
//   // el.style.backgroundColor = 'rgba(69,159,237,.3)'
//   el.style.backgroundColor = '#00e8c511'
//   // el.style.opacity = '0.1'
//   // el.style.border = '4px solid black'
//   el.style.outline = '4px solid #00c2a622'
//   el.style.outline = '2px solid #459fed'
//   el.style.outline = '2px solid #15E6CD'
//   el.style.outline = '2px solid #00e8c555'
//   el.style.top = offset.top + 'px'
//   el.style.left = offset.left + 'px'
//   el.style.width = e.offsetWidth + 'px'
//   el.style.height = e.offsetHeight + 'px'
//   el.style.pointerEvents = 'none'

//   document.body.prepend(el)

//   // window.z_index++
//   e.overlayEl = el
// }

// const addOverlay2 = function (e, ev) {
//   // console.log('sdfsdfsd', e)
//   // ev && ev.stopPropagation()
//   if (e.overlayEl) {
//     e.overlayEl.remove()
//     e.overlayEl = null
//   }
//   // removeOverlays()
//   const el = document.createElement('div')
//   el.setAttribute('class', 'overlay')

//   let rect = e.getBoundingClientRect()

//   let offset = {
//     top: rect.top,
//     left: rect.left,
//   }

//   // background-color: rgba(127,204,247,.3);
//   //   border-radius: 2px;
//   el.style.zIndex = window.z_index
//   el.style.position = 'absolute'
//   el.style.backgroundColor = '#e6f6f4'
//   el.style.backgroundColor = '#4c80fb11'
//   el.style.backgroundColor = 'rgba(127,204,247,.3)'
//   el.style.backgroundColor = '#00e8c511'
//   // el.style.opacity = '0.1'
//   // el.style.border = '4px solid black'
//   el.style.borderRadius = '2px'
//   // el.style.outline = '4px solid #4c80fb22'
//   el.style.top = offset.top + 'px'
//   el.style.left = offset.left + 'px'
//   el.style.width = e.offsetWidth + 'px'
//   el.style.height = e.offsetHeight + 'px'
//   el.style.pointerEvents = 'none'

//   document.body.prepend(el)

//   // window.z_index++
//   e.overlayEl = el
// }

// const removeOverlay = function (e) {
//   // console.log('e', e)
//   // console.log('overlay', e.overlayEl)
//   // e.stopPropagation()
//   e?.overlayEl?.remove()
//   e.overlayEl = null
// }

// const addListeners = () => {
//   removeOverlays()
//   document
//     .querySelectorAll('.main-wap [data-draggable]:hover')
//     .forEach((el) => {
//       addOverlay(el)
//       el.querySelectorAll("[contenteditable='true']:hover").forEach((ee) =>
//         addOverlay2(ee)
//       )
//     })
// }
// document
//   .querySelector('.main-wap')
//   ?.querySelectorAll('[data-draggable]')
//   ?.forEach((el) => {
//     el.addEventListener('mouseenter', (ev) => {
//       // addOverlay(el)
//       // utilService.debounce(addOverlay, 500)(el)
//     })
//     el.addEventListener('mouseover', (ev) => addOverlay(el, ev))
//     el.addEventListener('mouseout', (ev) => removeOverlay(el))
//     el.addEventListener('wheel', (ev) => {
//       // removeOverlays()
//       // removeOverlay(el)
//       // utilService.debounce(addOverlay, 1000)(el)
//       ev.fromElement &&
//         utilService.debounce(removeOverlay, 100, ev.fromElement)
//       // ev.fromElement && removeOverlay(ev.fromElement)
//       // addOverlay(e.toElement)
//     })
// }
// )

// const addOverlays = () =>
//   document
//     .querySelector('.main-wap')
//     .querySelectorAll('[data-draggable]')
//     .forEach((e) => {
//       addOverlay(e)
//     })

// const removeOverlays = () =>
//   document
//     .querySelector('.main-wap')
//     .querySelectorAll('[data-draggable],[contenteditable="true"]')
//     .forEach((e) => {
//       e?.overlayEl?.remove()
//       e.overlayEl = null
//     })

// window.addEventListener('load', () => {
//   // setInterval(addListeners, 10)
// })

const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueScrollTo)
app.use(Notifications)
app.component(Skeletor.name, Skeletor)

app.mount('#app')
