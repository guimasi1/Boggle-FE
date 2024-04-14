<script setup>
import { useGameStore } from '@/stores/gameStore'
import { computed, onMounted } from 'vue'
import { getGame } from '@/composables/fetchData'
import { useAuthStore } from '@/stores/authStore'

const gameStore = useGameStore()
const authStore = useAuthStore()
onMounted(async () => {
  try {
    console.log(gameStore.game.id)
    const gameData = await getGame(authStore.token, gameStore.game.id)
    if (gameData) gameStore.setGame(gameData)
  } catch (err) {
    console.log(err)
  }
})

const scores = computed(() => gameStore.game.scores)
</script>

<template>
  <div class="container mx-auto bg-orange-800 p-10 h-96 rounded-3xl">
    <div class="grid grid-cols-2 border-b-4 border-slate-200 pb-6">
      <div class="font-bold text-6xl text-center text-white">Player</div>
      <div class="font-bold text-6xl text-center text-white">Score</div>
    </div>
    <div v-for="score in scores" :key="score.id" class="grid grid-cols-2">
      <div class="text-4xl text-center mt-8 text-white">{{ score.user.username }}</div>
      <div class="text-4xl text-center mt-8 text-white">{{ score.score }}</div>
    </div>
  </div>
</template>
