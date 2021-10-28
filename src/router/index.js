import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue'),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import('../views/Admin.vue'),
  },
  {
    path: "/employee",
    name: "Employee",
    component: () => import('../views/Employee.vue'),
  },
  {
    path: "/booking_time",
    name: "BookingTime",
    component: () => import('../components/employee/booking_time.vue'),
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: () => import('../components/admin/schedule.vue'),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
