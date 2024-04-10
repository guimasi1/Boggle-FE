const baseUrl = 'http://localhost:3001'

export async function createGame(token: string, boardId: string, playersIds: string[]) {
  try {
    const response = await fetch(baseUrl + '/api/games', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({ board_id: boardId, players_ids: playersIds })
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export async function createBoard(token: string, size: number) {
  try {
    const response = await fetch(baseUrl + '/api/boards', {
      method: 'POST',
      headers: {
        AUthorization: 'Bearer ' + token,
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({ size })
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Something went wrong')
    }
  } catch (err) {
    console.log(err)
  }
}
