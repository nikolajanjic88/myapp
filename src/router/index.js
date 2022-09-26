import { createRouter, createWebHistory } from 'vue-router'
import KvizPrikaz from '../views/KvizPrikaz.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'KvizPrikaz',
    component: KvizPrikaz
  },

  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    // beforeEnter:(to,from,next) =>{
    //   if(store.state.isAuthenticated) next('/Profile');
    //   else next();
    // }
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/odjava',
    name: 'Odjava',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Odjava.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let isAuth = localStorage.getItem('isAuthenticatedLS')
  console.log(store.state.isAuthenticated,'123')
  if (to.name == 'KvizPrikaz' && !isAuth) next({ name: 'Login' })
  
  else next()
})


export default router
