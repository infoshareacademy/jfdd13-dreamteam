import { renderScore } from "./scoreboardRender";
import { generateRandomScore, fillScores } from "./scoreboardHelpers";
export const scoreboard = () => {
  const btnx = document.getElementById("scoreboardBtn");
  const scoreboard = document.getElementById("scoreboard");
  const playerName = document.getElementById("playerName");
  const saveScoreBtn = document.getElementById("saveScore");
  const resetScore = () =>
    localStorage.setItem("gameScores", JSON.stringify([]));
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

  const sortScores = arr =>
    arr.sort((a, b) => {
      a.score < b.score ? 1 : -1;
    });

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
    addScore(playerName.value, 998);
    checkScores(getScore);
  };

  saveScoreBtn.addEventListener("click", () => {
    handleScores()
  });

  btnx.addEventListener("click", () => {
    checkScores(getScore);
  });
};
