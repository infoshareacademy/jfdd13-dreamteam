export const renderScore = (data, parentEl) => {
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
