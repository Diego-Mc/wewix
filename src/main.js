import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'

import VueScrollTo from 'vue-scrollto'

const supportsContainerQueries = 'container' in document.documentElement.style
if (!supportsContainerQueries) {
  import('https://cdn.skypack.dev/container-query-polyfill')
}

// window.onload = () => {
//   const wap = document.querySelector('.main-wap')
//   new ResizeObserver(overLayFunc).observe(wap)
// }

// function overLayFunc(e) {
//   window.random = function () {
//     return 'aa' + Math.floor(Math.random() * Math.pow(10, 17))
//   }
//   window.z_index = 1
//   window.data_ = Array()

//   const addOverlay = function (e, id) {
//     const el = document.createElement('div', { class: 'overlay', id })
//     el.setAttribute('class', 'overlay')
//     el.setAttribute('id', id)

//     let rect = e.getBoundingClientRect()

//     let offset = {
//       top: rect.top + window.scrollY,
//       left: rect.left + window.scrollX,
//     }

//     el.style.zIndex = window.z_index
//     el.style.position = 'absolute'
//     el.style.backgroundColor = '#e6f6f4'
//     el.style.opacity = '0.1'
//     el.style.border = '2px solid black'
//     el.style.top = offset.top + 'px'
//     el.style.left = offset.left + 'px'
//     el.style.width = e.offsetWidth + 'px'
//     el.style.height = e.offsetHeight + 'px'
//     el.style.pointerEvents = 'none'

//     document.body.prepend(el)

//     z_index++
//     return this
//   }

//   document
//     // .querySelectorAll(
//     //   'span,h1,h2,h3,h4,table,td,tr,a,ul,li,ol,input,textarea,p,code,img'
//     // )
//     .querySelector('.main-wap')
//     .querySelectorAll('[data-draggable=true]')
//     .forEach(function (el) {
//       const rand = window.random()
//       el.setAttribute('DOMId', rand)

//       let rect = el.getBoundingClientRect()

//       let offset = {
//         top: rect.top + window.scrollY,
//         left: rect.left + window.scrollX,
//       }

//       window.data_.push(
//         Array(
//           rand,
//           { x: offset.left, y: offset.top },
//           {
//             x: offset.left + el.offsetWidth,
//             y: offset.top,
//           },
//           {
//             x: offset.left + el.offsetWidth,
//             y: offset.top + el.offsetHeight,
//           },
//           {
//             x: offset.left,
//             y: offset.top + el.offsetHeight,
//           },
//           false
//         )
//       )
//     })

//   document.body.onmousemove = function (e) {
//     // console.log('e', e)
//     for (let i in window.data_) {
//       let x = e.pageX
//       let y = e.pageY
//       if (
//         (x > window.data_[i][1].x) &
//         (x < window.data_[i][2].x) &
//         (y > window.data_[i][1].y) &
//         (y < window.data_[i][3].y) &
//         !window.data_[i][5]
//       ) {
//         const el = document.querySelector(
//           '[DOMId="' + window.data_[i][0] + '"]'
//         )

//         addOverlay(el, window.data_[i][0])
//         window.data_[i][5] = true
//       } else if (
//         ((x < window.data_[i][1].x) |
//           (x > window.data_[i][2].x) |
//           (y < window.data_[i][1].y) |
//           (y > window.data_[i][3].y)) &
//         window.data_[i][5]
//       ) {
//         document.querySelector('#' + window.data_[i][0]).remove()
//         window.data_[i][5] = false
//       }
//     }
//   }
// }

const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueScrollTo)

app.mount('#app')
