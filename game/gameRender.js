export class Render {
  static create(el, parent = board) {
    const parentVar = parent;
    const child = document.createElement("div");

    el.id = id++;
    child.setAttribute("id", `${el.name}${el.id}`);
    child.style.left = el.position.x + "px";
    child.style.top = el.position.y + "px";

    if (el.name === "player") {
      child.style.width = el.size.w + "px";
      child.style.height = el.size.h + "px";
      child.style.backgroundImage = "url('img/player_plane.png')";
      child.style.backgroundRepeat = "round";
      child.setAttribute("class", `player`);
    } else if (el.name === "obstacle") {
      child.style.width = el.size.w + "px";
      child.style.height = el.size.h + "px";
      child.style.backgroundImage = "url('img/tree3.png')";
      child.style.backgroundRepeat = "round";
      child.setAttribute("class", `obstacle ${el.name}`);
      treesArray.push(el);
    } else if (el.name === "bird") {
      child.style.width = el.size.w + "px";
      child.style.height = el.size.h + "px";
      child.style.backgroundImage = "url('img/bird_gull.png')";
      child.style.backgroundRepeat = "round";
      child.setAttribute("class", `bird ${el.name}`);
      birdsArray.push(el);
    } else if (el.name === "birdz") {
      child.style.width = el.size.w + "px";
      child.style.height = el.size.h + "px";
      child.style.backgroundImage = "url('img/bird_eagle.png')";
      child.style.backgroundRepeat = "round";
      child.setAttribute("class", `birdz ${el.name}`);
      birdsArray.push(el);
    } else {
      throw Error("unresolved object name in render create, line 90");
    }

    parentVar.appendChild(child);
    el.domEl = document.getElementById(`${el.name}${el.id}`);
    childrenArray.push(el);
  }

  static changePosition() {
    childrenArray.forEach((el) => {
      let x = el.position.x;
      let y = el.position.y;

      if (el.name === "player") {
        el.domEl.style.left = x + "px";
        el.domEl.style.top = y + "px";
      } else if (el.name === "obstacle" || el.name === "bird") {
        el.moveObst();
        el.domEl.style.left = x + "px";
      } else if (el.name === "birdz") {
        el.moveBirdZ();
        el.domEl.style.left = x + "px";
        el.domEl.style.top = y + "px";
      }
    });
  }

  static KeySupport(domEl, event) {
    childrenArray.forEach((el) => {
      if (el.type === "player") {
        switch (event.code) {
          case "ArrowLeft":
            if (el.position.x > boardStart) {
              el.playerLeft();
            }
            break;
          case "ArrowRight":
            if (el.position.x + playerWidth < boardWidth) {
              el.playerRight();
            }
            break;
          case "ArrowUp":
            if (el.position.y > boardStart) {
              el.playerUp();
            }
            break;
          case "ArrowDown":
            if (el.position.y + playerHeight < boardHeight) {
              el.playerDown();
            }
            break;
          default:
            return;
        }
      }
    });
  }

  static destroy(el) {
    el.domEl.style.transition = "opacity .1s ease-out";
    el.domEl.style.opacity = "0";
    el.domEl.remove();
    el.position.x = 1000;
    el.position.y = -1000;
    return (el = 0);
  }
}