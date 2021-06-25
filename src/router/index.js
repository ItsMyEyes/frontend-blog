import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/sign-in',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Sign In',
      guest: true,
    }
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Sign up',
      guest: true,
    }
  },
  {
    path: '/coming-soon-mobile',
    name: 'login',
    component: () => import('../views/coming.vue'),
    meta: {
      title: 'Coming soon',
    }
  },
  {
    path: '/:any',
    name: 'Detail',
    component: () => import('../views/detail.vue'),
    meta: {
      title: 'Detail',
    }
  },
  {
    path: '/me/write',
    name: 'write',
    component: () => import('../views/Write.vue'),
    meta: {
      title: 'Write story',
      midAuth: true,
    }
  },
  {
    path: '/iam/write',
    name: 'write',
    component: () => import('../views/tulis.vue'),
    meta: {
      title: 'Write story',
      midAuth: true,
    }
  },
  {
    path: '/aja/loading',
    name: 'loading',
    component: () => import('../views/loading.vue')
  },
  {
    path: '/me/edit/:id',
    name: 'write',
    component: () => import('../views/Edit.vue'),
    meta: {
      title: 'Edit story',
      midAuth: true,
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const DEFAULT_TITLE = 'Random';
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = `${to.meta.title} - Random` || DEFAULT_TITLE;
    });
});
console.log(store.state.user)

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.midAuth)) {
    if (store.state.user.auth == false) {
        next({
          name: "login"
        })
      } else {
        next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
      if (store.state.user.auth == false) {
        next()
      } else {
        next({
          name: "Home"
        })
      }
  } else {
    next()
  }
})

export default router
