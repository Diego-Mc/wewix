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

const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueScrollTo)

app.mount('#app')
