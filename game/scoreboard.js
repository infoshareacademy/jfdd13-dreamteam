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

const checkScores = arr => {
  if (arr.length) {
    if(arr.length < 10) {
      return //retrieve playerName
      //push score using addScore function
    }
    const lowestScore = arr.reduce((prev,cur) => {
      return prev.score < cur.score ? prev : cur;
  }, +Infinity);

  if (arr.length >= 10 && lowestScore.score < currentScore) {

    // filter for all scores equal or below actual score
    // pop lowest
    // add new
    // sort
    // add to highscore obj

    // further comments might be wrong

    // const lowestScoreIndex = arr.indexOf(lowestScore.name)
    //take index of lowest score object and change it's values
    //to new playerName and score
  }

  console.log(lowestScore)
  }
}
// setScore()