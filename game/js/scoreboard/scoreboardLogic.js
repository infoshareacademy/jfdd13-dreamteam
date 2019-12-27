import { renderScore } from "./scoreboardRender";

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
  const getScore = () => JSON.parse(localStorage.getItem("gameScores")) || resetScore();

  const scoreData = getScore();

  const setScore = (data=[]) =>
    localStorage.setItem("gameScores", JSON.stringify(data));
  const addScore = (player, score) => {
    const newScoreData = {
      name: player,
      score: score,
      date: new Date()
    };
    scoreData.push(newScoreData);
    return setScore(scoreData);
  };

  const sortScores = (arr) => {
    const sortedScores = arr.sort((a, b) => {
      if (a.score === b.score) {
        return new Date(b.date) - new Date(a.date);
      }
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
      if (arr.length < 10) {
        const output = sortScores(arr);
        return renderScore(output, scoreboard);
      } else {
        const tenScoresArr = sortScores(arr).slice(0, 10);
        setScore(tenScoresArr);
        return renderScore(tenScoresArr, scoreboard);
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
    checkScores(scoreData);
  }}};

  saveScoreBtn.addEventListener("click", () => {
    handleScores();
    document.getElementById('modalInputs').style.display = 'none';
  });

  btnClear.addEventListener("click", () => {
    resetScore()
  });
};
