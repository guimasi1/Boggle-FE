<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const username = ref('')
const registrationConfirmed = ref(false)
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

const register = async () => {
  if (isFormValid.value) {
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({
          email: email.value,
          username: username.value,
          password: password.value
        })
      })
      if (response.ok) registrationConfirmed.value = true
      else throw new Error('Something went wrong with the registration')
    } catch (err) {
      console.error(err)
    } finally {
      email.value = ''
      username.value = ''
      password.value = ''
    }
  } else {
    alert('Something went wrong, please retry')
    password.value = ''
    email.value = ''
    emailError.value = ''
    passwordError.value = ''
  }
}
</script>
<template>
  <div class="md:container md:mx-auto md:w-1/2 bg-orange-700 p-10 rounded-md ms-5 me-5">
    <h1 class="text-5xl text-black font-bold">Registration</h1>
    <form @submit.prevent="register">
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
        <label for="username" class="text-black mt-10">Username*</label>
        <input
          v-model="username"
          id="username"
          placeholder="Enter username"
          class="mt-3 md:w-1/2"
        />
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
        <button class="mt-10 font-bold text-lg">Sign me up!</button>
      </div>
    </form>
    <div
      v-if="registrationConfirmed"
      class="flex flex-col bg-green-800 w-1/2 rounded-md mt-5 p-3 text-slate-200"
    >
      <p><strong>Congratulations!</strong> You are now registered.</p>
      <p>Please login to play your first game.</p>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply rounded-full bg-black text-slate-200 px-4 py-2;
}
</style>
