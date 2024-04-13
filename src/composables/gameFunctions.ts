export async function sendWord(token: string, word: string, gameId: string, playerId: string) {
  try {
    const res = await fetch(
      `http://localhost:3001/api/games/handleWord?word=${word}&game_id=${gameId}&player_id=${playerId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    if (res.ok) {
      const data = await res.json()
      return data
    } else {
      throw new Error('Something went wrong')
    }
  } catch (err) {
    console.log(err)
  }
}
