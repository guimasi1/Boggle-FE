<script setup lang="ts">
import GameSetupButton from '@/components/GameSetupButton.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div class="container bg-orange-800 rounded-3xl pt-10 pb-10 mx-auto">
    <h1 class="text-center font-bold text-9xl">Boggle</h1>
    <div v-if="!authStore.isLoggedIn" class="text-center text-2xl mt-10">
      <p>Log in to play a game!</p>
    </div>
    <GameSetupButton v-if="authStore.isLoggedIn" />
  </div>
</template>

<style scoped>
.container {
  height: 600px;
}
</style>
