import { renderScore } from "./scoreboardRender";
import { generateRandomScore, fillScores } from "./scoreboardHelpers";

export const playerName = document.getElementById("playerName");
export let currentPlayerName = '';

export const scoreboard = () => {
  const btnClear = document.getElementById("scoreboardBtn");
  const scoreboard = document.getElementById("scoreboard");
  const saveScoreBtn = document.getElementById("saveScore");
  const resetScore = () => {
    localStorage.setItem("gameScores", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("gameScores"))
  };
  const getScore =
    JSON.parse(localStorage.getItem("gameScores")) || resetScore();

  const setScore = data =>
    localStorage.setItem("gameScores", JSON.stringify(data));
  const addScore = (player, score) => {
    const newScoreData = {
      name: player,
      score: score
    };
    getScore.push(newScoreData);
    return setScore(getScore);
  };

  const sortScores = (arr) => {
    const sortedScores = arr.sort((a, b) => {
      if (a.score < b.score) {
        return 1
      } else {
        return -1
      }
    });
    return sortedScores
  };

  const checkScores = arr => {
    if (arr.length) {
      if (arr.length <= 10) {
        const output = sortScores(arr);
        return renderScore(output, scoreboard);
      } else {
        const tenScoresArr = sortScores(arr).slice(0, 10);
        setScore(tenScoresArr);
        return renderScore(getScore, scoreboard);
      }
    }
  };

  const handleScores = () => {
    if (playerName.value !== '') {
      const currentScore = Number(localStorage.getItem('lastScore')) || 0;
      if (currentScore) {
    addScore(playerName.value, currentScore);
    currentPlayerName = playerName.value;
    playerName.value = '';
    checkScores(getScore);
  }}};

  saveScoreBtn.addEventListener("click", () => {
    handleScores();
    document.getElementById('modalInputs').style.display = 'none';
  });

  btnClear.addEventListener("click", () => {
    resetScore()
  });
};
