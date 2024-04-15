import type { Board, Game } from '@/common/types'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    board: null as Board | null,
    game: null as Game | null,
    responseMessage: '',
    timerCount: 60,
    timerSettedTo: 60,
    size: 4
  }),
  actions: {
    setBoard(board: Board) {
      this.board = board
    },
    setGame(game: Game) {
      this.game = game
    },
    setResponseMessage(response: string) {
      this.responseMessage = response
    },
    decrementTimer() {
      if (this.timerCount > 0) this.timerCount--
    },
    resetTimer() {
      this.timerCount = this.timerSettedTo
    },
    setTimerSetting(seconds: number) {
      this.timerSettedTo = seconds
      this.timerCount = seconds
    },
    setSize(size: number) {
      this.size = size
    }
  }
})
