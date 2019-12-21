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

const generateRandomScore = () => Math.floor(Math.random() * 1000);

const addScore = (player, score) => {
  const newScoreData = {
    name: player,
    score: score
  };
  getScore.push(newScoreData);

  return setScore(newScoreData);
};

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

const renderScore = (data, parentEl) => {
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

const sortScores = arr => {
  const sortedScores = arr.sort((a, b) => {
    a.score < b.score ? 1 : -1;
  });
  return sortedScores;
};

const checkScores = arr => {
  if (arr.length) {
    if (arr.length <= 10) {
      sortScores(arr, currentScore);
      return; //retrieve playerName
      //push score using addScore function
    } else {
      const tenScoresArr = sortScores(arr).slice(0, 10);
      localStorage.setItem("gameScores", tenScoresArr);
      console.log("tenScoresArr updated");
      //save scores in localStorage
      //render on scoreboard
    }
  }
};
// setScore()
