<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useGameStore } from '@/stores/gameStore'
import { onMounted, computed, ref } from 'vue'
import { createBoard, createGame } from '@/composables/fetchData'
import WordInputComponent from './WordInputComponent.vue'

const authStore = useAuthStore()
const gameStore = useGameStore()
const cells = computed(() => gameStore.board?.cells)
onMounted(async () => {
  try {
    const boardData = await createBoard(authStore.token, 4)
    if (!boardData) throw new Error('Failed to create board')
    gameStore.setBoard(boardData)
    if (authStore.user !== null) {
      const gameData = await createGame(authStore.token, boardData.id, [authStore.user.id])
      if (!gameData) throw new Error('Failed to create Game')
      gameStore.setGame(gameData)
    }
  } catch (error) {
    console.error('Error creating game:', error)
  }
})
</script>
<template>
  <div class="md:container md:mx-auto mx-10 bg-orange-400 rounded-2xl px-16 py-5">
    <div class="grid grid-cols-4 rounded-3xl border-8 border-red-600 p-1">
      <div class="cell rounded-xl m-1" v-for="(cell, index) in cells" :key="index">
        <div
          class="bg-white shadow-xl px-1 h-24 flex justify-center items-center font-bold rounded-2xl"
        >
          {{ cell.letter }}
        </div>
      </div>
    </div>
  </div>
  <WordInputComponent
    :token="authStore.token"
    :userId="authStore.user?.id"
    :gameId="gameStore.game?.id"
  />
</template>

<style scoped>
.cell {
  padding: 0.1em;
  color: #ff0a0ad2;
  background: #ff0a0ad2;

  text-align: center;
  font-weight: bold;
  font-size: 3em;
}
</style>
