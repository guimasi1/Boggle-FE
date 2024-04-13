import type { Board, Game } from '@/common/types'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    board: null as Board | null,
    game: null as Game | null,
    responseMessage: ''
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
    }
  }
})
