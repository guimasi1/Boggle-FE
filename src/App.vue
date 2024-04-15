<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import router from './router'

const authStore = useAuthStore()
const goToRegistration = () => {
  router.push('/registration')
}
</script>

<template>
  <header>
    <div>
      <nav class="flex justify-between mx-10 mt-4 mb-10">
        <RouterLink to="/" class="font-bold mt-2">Home</RouterLink>
        <div class="flex gap-4">
          <RouterLink to="/login" v-if="!authStore.isLoggedIn" class="font-bold mt-2"
            >Login</RouterLink
          >
          <RouterLink
            @click.prevent=""
            to="/registration"
            v-if="!authStore.isLoggedIn"
            class="font-bold px-6 py-2 bg-orange-500 rounded-full"
            >Register</RouterLink
          >
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
a {
  color: white;
}
</style>
