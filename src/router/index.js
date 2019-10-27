import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      autentificado: true
    }
  },
  {
    path: '/detalle/:pokemon?',
    name: 'detalle',
    component: () => import(/* webpackChunkName: "detalle" */ '../views/Detalle.vue'),
    meta: {
      autentificado: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  let autorizacion = to.matched.some(record => record.meta.autentificado);
  if (autorizacion && !usuario) {
    next('login')
  } else if (!autorizacion && usuario) {
    next('home');
  } else {
    next();
  }
})

export default router
