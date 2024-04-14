<script setup>
import { sendWord } from '@/composables/gameFunctions'
import { useGameStore } from '@/stores/gameStore'
import { computed, ref } from 'vue'

const gameStore = useGameStore()
const props = defineProps({
  token: String,
  gameId: String,
  userId: String
})
const word = ref('')
const responseMessage = computed(() => gameStore.responseMessage)
const borderValidWord = computed(() => {
  return responseMessage.value.toLowerCase().includes('points')
    ? 'border-2 border-green-500'
    : 'border-2 border-red-500'
})
const handleWord = async () => {
  try {
    const response = await sendWord(props.token, word.value, props.gameId, props.userId)
    if (response) {
      gameStore.setResponseMessage(response.response)
    } else {
      throw new Error('Response message not found.')
    }
  } catch (err) {
    console.log(err)
  }
  word.value = ''
}
</script>
<template>
  <div class="container mx-auto flex mt-6 flex-col items-center h-32">
    <div class="h-10 text-start mb-3">
      <p class="font-bold text-lg d-inline-block">{{ word }} <br /></p>
    </div>
    <form @submit.prevent="handleWord">
      <input type="text" v-model="word" class="rounded-xl mb-10" />
    </form>
    <div class="h-10 text-start">
      <p
        class="font-bold text-lg d-inline-block px-4 py-2 rounded-lg"
        :class="borderValidWord"
        v-if="responseMessage"
      >
        {{ responseMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
input {
  background-color: rgb(185, 122, 11);
  padding: 0.7em 2em;
}
</style>
