<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { ref, watch } from 'vue'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const isFormValid = ref(false)
const checkFormValidity = () => {
  isFormValid.value = !emailError.value && !passwordError.value && email.value && password.value
}

const validateEmail = () => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = pattern.test(email.value) ? '' : 'Invalid email address'
  checkFormValidity()
}
const validatePassword = () => {
  passwordError.value =
    password.value.length >= 8 ? '' : 'Password must be at least 8 characters long'
  checkFormValidity()
}

const login = async () => {
  if (isFormValid.value) {
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
  } else {
    alert('Something went wrong with the login')
    password.value = ''
    email.value = ''
    emailError.value = ''
    passwordError.value = ''
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
    class="md:container md:w-1/2 ms-5 me-5 md:mx-auto bg-gradient-to-r from-orange-700 to-rose-500 py-10 px-10 rounded-md"
  >
    <h1 class="text-5xl text-black font-bold">Login</h1>
    <p class="mt-4">Login with your data that you entered during your registration.</p>
    <form @submit.prevent="login">
      <div class="flex flex-col">
        <label for="email-input" class="text-black mt-10">Email address*</label>
        <input
          @blur="validateEmail"
          v-model="email"
          id="email-input"
          type="email"
          placeholder="Enter email address"
          class="mt-3 md:w-1/2"
          :class="{ 'border-red-900 border-4': emailError }"
        />
        <p v-if="emailError" class="mt-2 ms-2">{{ emailError }}</p>
      </div>
      <div class="flex flex-col">
        <label for="password-input" class="text-black mt-10">Password*</label>
        <input
          @blur="validatePassword"
          v-model="password"
          id="password-input"
          type="password"
          placeholder="Enter password"
          class="mt-3 md:w-1/2"
          :class="{ 'border-red-900 border-4': passwordError }"
        />
        <p v-if="passwordError" class="mt-2 ms-2">{{ passwordError }}</p>
      </div>
      <div>
        <button class="mt-10 font-bold text-lg">Continue</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
button {
  border-radius: 1.5em;
  padding: 0.5em 1em;
  color: #fff;
  border: #000;
  font: bold;
  background: rgb(3, 0, 0);
}
</style>
