<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useGameStore } from '@/stores/gameStore'
import { onMounted, computed } from 'vue'
import { createBoard, createGame } from '@/composables/fetchData'
import WordInputComponent from './WordInputComponent.vue'
import TimerItem from './TimerItem.vue'

const authStore = useAuthStore()
const gameStore = useGameStore()
const cells = computed(() => gameStore.board?.cells)
onMounted(async () => {
  try {
    const boardData = await createBoard(authStore.token, gameStore.size)
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
  <div class="md:container md:mx-auto bg-orange-500 rounded-2xl md:px-16 pt-1 pb-5">
    <div
      class="flex mx-auto justify-center items-center text-5xl text-red-900 d-inline-block rounded-xl h-12 my-2"
    >
      <TimerItem />
    </div>
    <div class="lg:w-10/12 mx-auto px-2 md:px-0">
      <div
        class="board grid rounded-3xl border-8 border-red-600 p-1 flex-wrap gap-2"
        :class="{ 'grid-cols-4': gameStore.size === 4, 'grid-cols-5': gameStore.size === 5 }"
      >
        <div
          class="cell rounded-xl md:h-full bg-white shadow-xl flex justify-center items-center"
          v-for="(cell, index) in cells"
          :key="index"
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
  width: 95%;
  text-align: center;
  font-weight: bold;
  font-size: 2em;
}

.board {
  height: 571px;
}
</style>
