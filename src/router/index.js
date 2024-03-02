import { createRouter, createWebHistory } from 'vue-router'
import ChatSection from '../views/ChatSection/index.vue'
import ModelsSection from '../views/ModelsSection/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: ChatSection
    },

    {
      path: '/models',
      name: 'models',
      component: ModelsSection
    },

  ]
})


export default router
