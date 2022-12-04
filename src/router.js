import { createRouter, createWebHashHistory } from 'vue-router'

import appHome from './views/app-home.vue'
import appTemplates from './views/app-templates.vue'
import appEditor from './views/app-editor.vue'
import appDashboard from './views/app-dashboard.vue'
import appDashboardDetails from './views/app-dashboard-details.vue'
import appPreview from './views/app-preview.vue'
import testTestTest from './views/test-test-test.vue'
import appPublish from './views/appPublish.vue'

import editorWithStyle from './views/editor-with-style.vue'

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
    path: '/edit/:id?',
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
    path: '/testtest',
    name: 'testtest',
    component: testTestTest,
  },
  {
    path: '/editorWithStyle/:id',
    name: 'editorWithStyle',
    component: editorWithStyle,
  },
  {
    path: '/:name?',
    name: 'publish-wap',
    component: appPublish,
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
