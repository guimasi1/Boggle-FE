<script setup>
import router from '@/router'
import { useGameStore } from '@/stores/gameStore'
import { watch } from 'vue'
import { computed, onMounted, onUnmounted } from 'vue'
const gameStore = useGameStore()

const timer = computed(() => gameStore.timerCount)
let intervalId
onMounted(() => {
  gameStore.resetTimer()
  intervalId = setInterval(() => {
    gameStore.decrementTimer()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
  gameStore.resetTimer()
})
watch(timer, () => {
  if (timer.value === 0) {
    gameStore.resetTimer()
    clearInterval(intervalId)
    router.push('/game-result')
  }
})
</script>
<template>
  <div class="font-bold">{{ timer }}</div>
</template>
