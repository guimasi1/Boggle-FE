import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import LoginPage from '@/components/LoginPage.vue'
import GameplayPage from '@/components/GameplayPage.vue'
import GameResultPage from '@/components/GameResultPage.vue'
import RegistrationPage from '@/components/RegistrationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/gameplay',
      name: 'gameplay',
      component: GameplayPage
    },
    {
      path: '/game-result',
      name: 'game-result',
      component: GameResultPage
    },
    {
      path: '/registration',
      name: 'register',
      component: RegistrationPage
    }
  ]
})

export default router
