import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesLayout from '../views/admin/services/ServicesLayout.vue'
import AppointmentsLayout from '../views/admin/appointments/AppointmentsLayout.vue'
import AuthAPI from '../api/AuthAPI'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('../views/admin/WelcomeView.vue')
        },
        {
          path: 'servicios',
          component: ServicesLayout,
          children: [
            {
              path: '',
              name: 'services',
              component: () => import('../views/admin/services/ServicesView.vue')
            },
            {
              path: 'agregar-servicio',
              name: 'add-service',
              component: () => import('../views/admin/services/NewServiceView.vue')
            },
            {
              path: ':id/editar',
              name: 'edit-service',
              component: () => import('../views/admin/services/EditServiceView.vue')
            }

          ]
        },
        {
          path: 'citas',
          component: AppointmentsLayout,
          children: [
            {
              path: '',
              name: 'appointments',
              component: () => import('../views/admin/appointments/AppointmentsView.vue')
            }
          ]

        },
        {
          path: 'horario',
          component: () => import('../views/admin/schedule/ScheduleLayout.vue'),
          children: [
            {
              path: '',
              name: 'working-hours',
              component: () => import('../views/admin/schedule/ScheduleView.vue'),
            },
            {
              path: ':id/editar',
              name: 'edit-hours',
              component: () => import('../views/admin/schedule/EditScheduleView.vue'),
            }
          ]

        }
      ]
    }
  ]
})


router.beforeEach(async (to, from, next) => {

  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {

      const { data } = await AuthAPI.auth()
      // console.log(data.isAdmin);
      if (data.isAdmin) {
        next()
      } else {

        next({ name: 'home' })

      }



    } catch (error) {
      next({ name: 'home' })
    }
  } else {
    next()
  }


})


export default router
