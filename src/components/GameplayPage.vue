<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useGameStore } from '@/stores/gameStore'
import { ref, onMounted, computed } from 'vue'
import { createBoard } from '@/composables/fetchData'

const authStore = useAuthStore()
const gameStore = useGameStore()
const word = ref('')
const cells = computed(() => gameStore.board?.cells)

onMounted(async () => {
  try {
    const boardData = await createBoard(authStore.token, 4) // assumendo che `size` sia 4
    if (!boardData) throw new Error('Failed to create board')
    gameStore.setBoard(boardData)

    console.log(boardData)
  } catch (error) {
    console.error('Error creating game:', error)
  }
})
const sendWord = async () => {
  try {
    const res = await fetch(
      `http://localhost:3001/api/games/handleWord?word=${authStore.user?.id}&game_id=$&player_id=$`,
      {
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      }
    )
    if (res.ok) {
      const data = await res.json()
      console.log(data)
    } else {
      throw new Error('Something went wrong')
    }
  } catch (err) {
    console.log(err)
  } finally {
    word.value = ''
  }
}
</script>
<template>
  <div class="md:container md:mx-auto mx-10 bg-orange-400 rounded-2xl px-20">
    <div class="grid grid-cols-4 p-10">
      <div class="cell border-black border" v-for="(cell, index) in cells" :key="index">
        {{ cell.letter }}
      </div>
    </div>
  </div>
  <div class="container mx-auto flex justify-center mt-6">
    <form @submit.prevent="sendWord">
      <input type="text" v-model="word" class="rounded-xl mb-10" />
    </form>
  </div>
</template>

<style scoped>
.cell {
  padding: 1.3em 2em;
  color: #000;
  text-align: center;
  font-weight: bold;
  font-size: 2.2em;
}

input {
  background-color: rgb(185, 122, 11);
  padding: 0.7em 2em;
}
</style>
