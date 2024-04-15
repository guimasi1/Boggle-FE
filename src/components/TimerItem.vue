<script setup>
import router from '@/router'
import { useGameStore } from '@/stores/gameStore'
import { watch } from 'vue'
import { computed, onMounted, onUnmounted } from 'vue'
const gameStore = useGameStore()

const timer = computed(() => gameStore.timerCount)
const minutes = computed(() => Math.floor(gameStore.timerCount / 60))

const seconds = computed(() =>
  gameStore.timerCount - 60 < 0 ? gameStore.timerCount : gameStore.timerCount - 60
)
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
    gameStore.setResponseMessage('')
    router.push('/game-result')
  }
})
</script>
<template>
  <div class="flex gap-1">
    <span class="font-bold" v-if="minutes">{{ minutes.toString().padStart(2, '0') }}:</span>
    <span class="font-bold">{{ seconds.toString().padStart(2, '0') }}</span>
  </div>
</template>
