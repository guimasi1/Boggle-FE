<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { ref, watch } from 'vue'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.value, password: password.value }),
      headers: {
        'Content-Type': 'Application/JSON'
      }
    })
    if (response.ok) {
      const data = await response.json()
      authStore.setToken(data.token)
      router.push({ path: '/' })
    } else {
      throw new Error('Something went wrong')
    }
  } catch (err) {
    console.log(err)
  } finally {
    email.value = ''
    password.value = ''
  }
}

watch(
  () => authStore.token,
  async (newToken, oldToken) => {
    if (newToken) {
      try {
        const response = await fetch('http://localhost:3001/api/users/me', {
          headers: {
            Authorization: 'Bearer ' + newToken
          }
        })
        const data = await response.json()
        authStore.setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
  }
)
</script>

<template>
  <div
    class="md:container ms-5 me-5 md:mx-auto bg-gradient-to-r from-orange-700 to-rose-500 py-10 px-10 rounded-md"
  >
    <h1 class="text-5xl text-black font-bold">Login</h1>
    <p class="mt-4">Login with your data that you entered during your registration.</p>
    <form @submit.prevent="login">
      <div class="flex flex-col">
        <label for="email-input" class="text-black mt-10">Email address*</label>
        <input
          v-model="email"
          id="email-input"
          type="email"
          placeholder="Enter email address"
          class="mt-3 md:w-1/4"
        />
      </div>
      <div class="flex flex-col">
        <label for="password-input" class="text-black mt-10">Password*</label>
        <input
          v-model="password"
          id="password-input"
          type="password"
          placeholder="Enter password"
          class="mt-3 md:w-1/4"
        />
      </div>
      <div>
        <button class="mt-10 font-bold text-lg">Continue</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
input {
  border-radius: 0.3em;
  color: black;
  padding: 0.7em 0.5em;
}
input::placeholder {
  margin: 0.3em;
}
button {
  border-radius: 0.5em;
  padding: 0.5em 1em;
  color: #fff;
  border: #000;
  font: bold;
  background: rgb(3, 0, 0);
}
</style>
