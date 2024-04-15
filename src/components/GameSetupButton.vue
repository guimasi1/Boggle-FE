<script setup lang="ts">
import router from '@/router'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
const startGame = () => {
  router.push({ path: '/gameplay' })
  gameStore.setResponseMessage('')
}

const handleSize = (e: Event): void => {
  const inputElement = e.target as HTMLInputElement
  const size = Number(inputElement.value)
  gameStore.setSize(size)
}

const handleTimer = (e: Event): void => {
  const inputElement = e.target as HTMLInputElement
  const newTime = Number(inputElement.value)
  gameStore.setTimerSetting(newTime)
}
</script>

<template>
  <div class="container mx-auto mt-52">
    <form class="flex flex-col items-center">
      <div class="flex gap-32">
        <div class="flex-col">
          <p class="text-2xl mb-4 text-center">Size</p>
          <div class="flex gap-5 mb-10">
            <div class="flex gap-2">
              <input
                @change.prevent="handleSize($event)"
                name="size"
                id="size-4"
                type="radio"
                value="4"
              />
              <label name="size" for="size-4" class="text-2xl">4</label>
            </div>
            <div class="flex gap-2">
              <input
                @change.prevent="handleSize($event)"
                name="size"
                id="size-5"
                type="radio"
                value="5"
              />
              <label name="size" for="size-5" class="text-2xl">5</label>
            </div>
          </div>
        </div>
        <div class="flex-col">
          <p class="text-2xl mb-4 text-center">Time</p>
          <div class="flex gap-5 mb-10">
            <div class="flex gap-2">
              <input
                @change.prevent="handleTimer($event)"
                name="time"
                id="seconds-60"
                type="radio"
                value="60"
              />
              <label name="time" for="seconds-60" class="text-2xl">60</label>
            </div>
            <div class="flex gap-2">
              <input
                @change.prevent="handleTimer($event)"
                name="time"
                id="seconds-90"
                type="radio"
                value="90"
              />
              <label name="time" for="seconds-90" class="text-2xl">90</label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button class="text-3xl font-bold px-8 py-2 bg-green-800 rounded-full" @click="startGame">
          Start!
        </button>
      </div>
    </form>
  </div>
</template>
