<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const startGame = () => {
  router.push({ path: '/gameplay' })
}
</script>

<template>
  <div class="container mx-auto mt-20">
    <div class="flex justify-center">
      <button
        v-if="authStore.isLoggedIn"
        class="text-5xl font-bold px-6 py-3 bg-green-800 rounded-full"
        @click="startGame"
      >
        Start!
      </button>
    </div>
  </div>
</template>
