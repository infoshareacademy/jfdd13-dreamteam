import {currentPlayerName} from "./scoreboardLogic";

export const renderScore = (data, parentEl) => {
  parentEl.innerHTML = '';
  const listContainer = document.createElement("ol");
  listContainer.classList.add('scoreboard__container');
  data.map(item => {
    const domListItem = document.createElement("li");
    const playerEl = document.createElement("span");
    domListItem.classList.add('scoreboard__item');
    playerEl.classList.add('scoreboard__value');
    if (item.name === currentPlayerName) {
      playerEl.style.fontWeight = 'bold'
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