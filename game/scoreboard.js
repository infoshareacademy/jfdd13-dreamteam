const scoreData = [
  {
    name: 'dupa',
    score: 300
  },
  {
    name: 'z trupa',
    score: 555
  }
]
const getScore = JSON.parse(localStorage.getItem('gameScores')) || [];
const setScore = data => localStorage.setItem('gameScores', JSON.stringify(data))
const playerScore = 400
const playerName = 'Dupa'

const addScore = (player, score) => {
  const newScoreData = {
    name: player,
    score: score
  }
  getScore.push(newScoreData)

  return setScore(newScore)
}

const displayScore = (data, parentEl) => {
  const listContainer = document.createElement('ul')
  data.map(item => {
    const domListItem = document.createElement('li')
    const playerEl = document.createElement('span')
    playerEl.innerText = item.name
    domListItem.appendChild(playerEl)
    const scoreEl = document.createElement('span')
    scoreEl.innerText = item.score
    domListItem.appendChild(scoreEl)
    listContainer.appendChild(domListItem)
  })
  parentEl.appendChild(listContainer)
}

const checkScoresLength = arr => {
  if (arr.length) {
    
    const lowestScore = arr.reduce((prev,cur) => {
      return prev.score < cur.score ? prev : cur;
  }, +Infinity);
  
  console.log(secondTest)
  }
}
// setScore()