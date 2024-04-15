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
  <div class="container mx-auto flex mt-5 flex-col items-center h-16">
    <form @submit.prevent="handleWord">
      <input type="text" v-model="word" class="bg-orange-500 rounded-xl mb-6 text-white" />
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
  padding: 0.7em 2em;
}
</style>
