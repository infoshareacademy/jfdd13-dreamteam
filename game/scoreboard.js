const renderScore = (data, parentEl) => {
  const listContainer = document.createElement("ul");
  listContainer.classList.add('scoreboard__container')
  data.map(item => {
    const domListItem = document.createElement("li");
    const playerEl = document.createElement("span");
    domListItem.classList.add('scoreboard__item')
    playerEl.classList.add('scoreboard__value')
    playerEl.innerText = item.name;
    domListItem.appendChild(playerEl);
    const scoreEl = document.createElement("span");
    scoreEl.innerText = item.score;
    scoreEl.classList.add('scoreboard__value')
    domListItem.appendChild(scoreEl);
    listContainer.appendChild(domListItem);
  });
  parentEl.appendChild(listContainer);
};


const btnx = document.getElementById('scoreboardBtn')
const scoreboard = document.getElementById('scoreboard')

const resetScore = () => localStorage.setItem("gameScores", JSON.stringify([]));
const getScore = JSON.parse(localStorage.getItem("gameScores")) || resetScore();

const setScore = data => localStorage.setItem("gameScores", JSON.stringify(data));
const addScore = (player, score) => {
  const newScoreData = {
    name: player,
    score: score
  };
  getScore.push(newScoreData);
  return setScore(getScore);
};

const generateRandomScore = () => Math.floor(Math.random() * 1000);
const fillScores = num => {
  const nameArr = [
    "Kent Sauro",
    "Donald Mitten",
    "Sherill Mayson",
    "Wilbur Overton",
    "Alison Daughtrey",
    "Coleen Carrington",
    "Mara Royce",
    "Vickey Sarris",
    "Patsy Narducci",
    "Josue Weitzel"
  ];
  for (let i = 0; i < num; i++) {
    addScore(nameArr[i], generateRandomScore());
  }
};

const sortScores = arr => arr.sort((a, b) => {
    a.score < b.score ? 1 : -1;
  ;
});

const checkScores = arr => {
  if (arr.length) {
    if (arr.length <= 10) {
      const output = sortScores(arr);
      return renderScore(output, scoreboard)
    } else {
      const tenScoresArr = sortScores(arr).slice(0, 10);
      setScore(tenScoresArr)
      return renderScore(getScore, scoreboard)
    }
  }
};

btnx.addEventListener('click' , () => {
  checkScores(getScore)
})