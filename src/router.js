import { createRouter, createWebHashHistory } from 'vue-router'

import appHome from './views/app-home.vue'
import appTemplates from './views/app-templates.vue'
import appEditor from './views/app-editor.vue'
import appDashboard from './views/app-dashboard.vue'
import appDashboardDetails from './views/app-dashboard-details.vue'
import appPreview from './views/app-preview.vue'
import testTest from './views/test-test.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: appHome,
  },
  {
    path: '/templates',
    name: 'app-templates',
    component: appTemplates,
  },
  {
    path: '/edit/?:id',
    name: 'app-editor',
    component: appEditor,
  },
  {
    path: '/dashboard',
    name: 'app-dashboard',
    component: appDashboard,
    children: [
      {
        path: ':name',
        name: 'app-dashboard-details',
        component: appDashboardDetails,
      },
    ],
  },
  {
    path: '/preview/:id',
    name: 'app-preview',
    component: appPreview,
  },
  {
    path: '/test',
    name: 'test',
    component: testTest,
  },
  // {
  //   path: dynamicUrl,
  //   name: 'app-publish',
  //   component: appPublish,
  // },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
})
