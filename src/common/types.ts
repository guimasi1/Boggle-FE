export interface User {
  id: String
  username: String
  email: String
  games?: Score[]
  role?: String
  scores?: Score[]
}

export interface Game {
  id: String
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
  id: String
  letter: String
  row: Number
  col: Number
  board?: Board
}

export interface Score {
  id: String
  score: Number
  game?: Game
  user?: User
}

export interface UserLoginData {
  email: String
  password: String
}
