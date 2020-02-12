import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Landing from '../views/Landing'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/landing',
    name: 'landing',
    component: Landing
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
