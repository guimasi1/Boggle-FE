import { defineStore } from 'pinia'
import { type User } from '@/common/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false as Boolean,
    token: '' as string
  }),
  actions: {
    setToken(token: string) {
      this.isLoggedIn = true
      this.token = token
    },
    setUser(user: User) {
      this.user = user
    },
    logout() {
      this.user = null
      this.isLoggedIn = false
      this.token = ''
    }
  },
  getters: {
    logged(): Boolean {
      return this.isLoggedIn
    }
  }
})
