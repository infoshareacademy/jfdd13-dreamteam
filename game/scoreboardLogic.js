import {renderScore} from './scoreboard'

const btn = document.getElementById('scoreboardBtn')

const resetScore = localStorage.setItem("gameScores", JSON.stringify([]));
const getScore = JSON.parse(localStorage.getItem("gameScores")) || resetScore;

const setScore = data => localStorage.setItem("gameScores", JSON.stringify(data));
const addScore = (player, score) => {
  const newScoreData = {
    name: player,
    score: score
  };
  getScore.push(newScoreData);
  return setScore(newScoreData);
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

const sortScores = arr => {
  const sortedScores = arr.sort((a, b) => {
    a.score < b.score ? 1 : -1;
  });
  return sortedScores;
};

const checkScores = arr => {
  if (arr.length) {
    if (arr.length <= 10) {
      const output = sortScores(arr, currentScore);
      return renderScore(output, document.getElementById('scoreboard'))
      //push score using addScore function
    } else {
      const tenScoresArr = sortScores(arr).slice(0, 10);
      setScore(tenScoresArr)
      console.log("tenScoresArr updated");
      //save scores in localStorage
      //render on scoreboard
    }
  }
};

btn.addEventListener('click' , checkScores(getScore)
