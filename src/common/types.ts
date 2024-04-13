export interface User {
  id: string
  username: string
  email: string
  games?: Score[]
  role?: string
  scores?: Score[]
}

export interface Game {
  id: string
  board?: Board
  users?: User[]
  scores?: Score[]
}

export interface Board {
  id: String
  game?: Game
  cells?: Cell[]
}

export interface Cell {
  id: string
  letter: string
  row: Number
  col: Number
  board?: Board
}

export interface Score {
  id: string
  score: Number
  game?: Game
  user?: User
}

export interface UserLoginData {
  email: string
  password: string
}
