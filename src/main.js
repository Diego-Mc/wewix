import { createApp } from 'vue'

// Register the component globally

import { router } from './router.js'
import { store } from './store/store.js'

import Notifications from '@kyvg/vue3-notification'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

import VueSkeletor from 'vue-skeletor';
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'

import VueScrollTo from 'vue-scrollto'
import { utilService } from './services/util.service.js'



const supportsContainerQueries = 'container' in document.documentElement.style
if (!supportsContainerQueries) {
  import('https://cdn.skypack.dev/container-query-polyfill')
}

import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(rootCmp)

app.use(vue3GoogleLogin, {
  clientId: '334191761722-571betvfqffoabg2h3ftn7dkndlsiu6p.apps.googleusercontent.com'
})


app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueScrollTo)
app.use(Notifications)
app.use(VueSkeletor)

app.mount('#app')
