import store from '@/store'
import EditView from '@/views/EditView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {protectedRoute: true}
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditView,
    meta: {protectedRoute: true}
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( (to, from, next) => {
  // console.log(to.meta.protectedRoute)
  const isAuthenticated = store.getters.authenticated

  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next('/');
  }

  if (to.meta.protectedRoute) {
    if (isAuthenticated) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
