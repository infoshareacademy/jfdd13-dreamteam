const scoreData = [
  {
    name: "dupa",
    score: 300
  },
  {
    name: "z trupa",
    score: 555
  }
];
const resetScore = localStorage.setItem("gameScores", JSON.stringify([]));
const getScore = JSON.parse(localStorage.getItem("gameScores")) || resetScore;
const setScore = data =>
  localStorage.setItem("gameScores", JSON.stringify(data));
const playerScore = 400;
const playerName = "Dupa";

const generateRandomScore = () => Math.floor(Math.random() * 1000)

const addScore = (player, score) => {
  const newScoreData = {
    name: player,
    score: score
  };
  getScore.push(newScoreData);

  return setScore(newScoreData);
};

const displayScore = (data, parentEl) => {
  const listContainer = document.createElement("ul");
  data.map(item => {
    const domListItem = document.createElement("li");
    const playerEl = document.createElement("span");
    playerEl.innerText = item.name;
    domListItem.appendChild(playerEl);
    const scoreEl = document.createElement("span");
    scoreEl.innerText = item.score;
    domListItem.appendChild(scoreEl);
    listContainer.appendChild(domListItem);
  });
  parentEl.appendChild(listContainer);
};

const currentScore = {
  name: 'Pavarotti',
  score: 99999
};

const processScores = (arr, score) => {
  arr.push(score);
  const sortedScores = arr.sort((a, b) => {
    if (a.score < b.score) {
      return 1
    } else {
      return -1
    }
  })
  console.log(sortedScores)
}

const checkScores = arr => {
  if (arr.length) {
    if (arr.length < 10) {
      processScores(arr, currentScore)
      return; //retrieve playerName
      //push score using addScore function
    }
    const lowestScore = arr.reduce((prev, cur) => {
      return prev.score < cur.score ? prev : cur;
    }, +Infinity);
    if (lowestScore.score < currentScore) {
      const tenScoresArr = processScores(arr, currentScore).slice(0, 10)
      //save scores in localStorage
      //render on scoreboard
    }

    console.log(lowestScore);
  }
};
// setScore()
