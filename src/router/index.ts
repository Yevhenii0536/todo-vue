import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TodoDetails from '../views/TodoDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todo/:id',
      name: 'todo-details',
      component: TodoDetails,
    },
  ]
})

export default router
