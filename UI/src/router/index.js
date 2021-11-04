import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Predict from '../views/Predict.vue'
import Sheet from '@/views/Sheet.vue'
import SearchTable from '../components/controls/SearchTable.vue'
import { shuffleSong } from '@/lib/songPresets'

Vue.use(Router)
const github = { template: '<div>github</div>'}

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/event/1',
      name: 'predict',
      component: Predict,
      redirect: '/shuffle'
    },
    {
      path: '/event/2',
      beforeEnter() {location.href = 'https://github.com/arpithagurumurthy/MusicGuru_Latest'},
			component: github
    },
    {
      path: '/shuffle',
      redirect: to => {
        const song = shuffleSong()
        return `/song/${song.sid}`
      }
    },
    {
      path: '/song/:sid',
      component: Predict
    },
    {
      path: '/song/:sid',
      component: Predict
    },
    {
      path: '/predict/:pid',
      component: Predict
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: Sheet
    }
  ],
  mode: 'history',
  linkActiveClass: 'active'
})

export default router

router.beforeEach((to, from, next) => {
  // Redirect if path begins with a hash (ignore hashes later in path)
  if (to.redirectedFrom && to.redirectedFrom.substr(0, 2) === '/#') {
    const path = to.redirectedFrom.substr(2)
    // eslint-disable-next-line no-console
    console.log(`Rerouted from ${to.redirectedFrom} to ${path}`)
    next({ path, replace: true })
  } else {
    next()
  }
})