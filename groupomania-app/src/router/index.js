import { createRouter, createWebHashHistory } from 'vue-router'
import LogIn from "../views/LogIn.vue"
import SignUp from "../views/SignUp.vue"
import Home from "../views/Home.vue"
import UserProfile from "../views/UserProfile.vue"


const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/userprofile',
    name: 'UserProfile',
    component: UserProfile
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
