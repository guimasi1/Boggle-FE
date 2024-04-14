<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useGameStore } from '@/stores/gameStore'

const authStore = useAuthStore()
const gameStore = useGameStore()
const startGame = () => {
  router.push({ path: '/gameplay' })
  gameStore.setResponseMessage('')
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
