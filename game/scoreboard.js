const scoreData = {
  'Andrzej': 300,
  'Paweł': 200
}
const getScore = JSON.parse(localStorage.getItem('gameScores')) || {};
const setScore = data => localStorage.setItem('gameScores', JSON.stringify(data))
const playerScore = 400
const playerName = 'Dupa'

const addScore = (player, score) => {
  let newScoreData = {}
  newScoreData[player] = score
  const newScore = [
    getScore,
    ...newScoreData
  ]
  
  return setScore(newScore)
}
// setScore()