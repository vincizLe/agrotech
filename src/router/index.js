import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexView from "@/views/IndexView";
import UsersView from "@/views/UsersView";
import PlotsView from "@/views/PlotsView";
import SillView from "@/views/SillView";
import ProfileVue from "@/views/ProfileVue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/index',
    name:'index',
    component: IndexView
  },
  {
    path: '/users',
    name:'Users',
    component: UsersView
  },
  {
    path: '/plots',
    name: 'Plots',
    component: PlotsView
  },
  {
    path: '/sills',
    name: 'Sills',
    component: SillView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileVue
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
