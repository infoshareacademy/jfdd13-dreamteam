const scoreData = {
  'Andrzej': 300,
  'Paweł': 200
}
const getScore = localStorage.getItem('gameScores') || {};
const setScore = data => localStorage.setItem('gameScores', data)
const playerScore = 400
const playerName = 'Dupa'

const addScore = (player, score) => {
  const newScore = {
    ...getScore,
    player : score
  }
  return setScore(newScore)
}
// setScore()