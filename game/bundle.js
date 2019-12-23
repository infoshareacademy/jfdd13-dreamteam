(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  const instruction = () => {
    const modal = document.getElementById("instBoxM");

  const btn = document.getElementById("inst__btn");

  const span = document.getElementsByClassName("modal__close")[0];
  const closeBtn = document.getElementById("close__btn");

  btn.onclick = function() {
    modal.style.display = "flex";
  };

  span.onclick = function() {
    modal.style.display = "none";
  };

  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  };

  const renderScore = (data, parentEl) => {
    const listContainer = document.createElement("ol");
    listContainer.classList.add('scoreboard__container');
    data.map(item => {
      const domListItem = document.createElement("li");
      const playerEl = document.createElement("span");
      domListItem.classList.add('scoreboard__item');
      playerEl.classList.add('scoreboard__value');
      if (item.name === currentPlayerName) {
        playerEl.style.fontWeight = 'bold';
      }
      playerEl.innerText = item.name;
      domListItem.appendChild(playerEl);
      const scoreEl = document.createElement("span");
      scoreEl.innerText = item.score;
      scoreEl.classList.add('scoreboard__value');
      domListItem.appendChild(scoreEl);
      listContainer.appendChild(domListItem);
    });
    parentEl.appendChild(listContainer);
  };

  const playerName = document.getElementById("playerName");
  let currentPlayerName = '';

  const scoreboard = () => {
    const btnx = document.getElementById("scoreboardBtn");
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

    btnx.addEventListener("click", () => {
      sortScores(getScore);
      checkScores(getScore);
    });
  };

  // import {game} from './game'
  instruction();
  scoreboard();
  // game()

})));
