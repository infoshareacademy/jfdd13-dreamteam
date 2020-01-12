class Board {
  constructor(dom, children, btns, minX, maxX, minY, maxY) {
    this.dom = dom;
    this.children = children;
    this.btns = btns;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }
}
class BoardElement {
  constructor(
    name,
    dom,
    id,
    position = { x: "", y: "" },
    size = { w: "", h: "" },
    speed,
    type,
    destroyed
  ) {
    this.name = name;
    this.dom = dom;
    this.id = id;
    this.position = position;
    this.position.x = position.x;
    this.position.y = position.y;
    this.size = size;
    this.size.w = size.w;
    this.size.h = size.h;
    this.speed = speed;
    this.type = type;
    this.destroyed = destroyed;
  }
  changePosition() {
    this.dom.style.left = `${this.position.x}px`;
    this.dom.style.top = `${this.position.y}px`;
  }
  move(direction) {
    if (typeof direction === "string" && this.destroyed === false) {
      switch (direction.toLowerCase()) {
        case "left":
          this.position.x -= this.speed;
          this.changePosition();
          break;
        case "right":
          this.position.x += this.speed;
          this.changePosition();
          break;
        case "up":
          this.position.y -= this.speed;
          this.changePosition();
          break;
        case "down":
          this.position.y += this.speed;
          this.changePosition();
          break;
        default:
          null;
      }
    }
  }
}
class Player extends BoardElement {
  constructor(
    name,
    dom,
    id,
    position = { x: "", y: "" },
    size = { w: "", h: "" },
    speed,
    type,
    destroyed
  ) {
    super(name, dom, id, position, size, speed, type, destroyed);
  }
  keySupport = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        this.position.x >= 1 ? this.move("left") : null;
        break;
      case "ArrowRight":
        this.position.x <= 599 - this.size.w ? this.move("right") : null;
        break;
      case "ArrowUp":
        this.position.y >= 1 ? this.move("up") : null;
        break;
      case "ArrowDown":
        this.position.y <= 599 - this.size.h ? this.move("down") : null;
    }
  };
}

class Game {
  getBoard() {
    return document.getElementById("board");
  }
  getBtns() {
    return Array.from(document.querySelectorAll(".board__btn"));
  }
  board = new Board(
    this.getBoard(),
    [],
    this.getBtns(),
    0,
    this.getBoard().offsetWidth,
    0,
    this.getBoard().offsetHeight
  );
  activeIntervals = [];
  activeListeners = []
  create(type) {
    const creationType = type;
    const createPlayer = () => {
      return this.board.children.push(
        new Player(
          "player",
          document.getElementById("player"),
          0,
          {
            x: 160,
            y: 160
          },
          { w: 50, h: 50 },
          2,
          "player",
          false
        )
      );
    };
    const createObstacle = creationName => {
      //generateBirdY is possible to export
      const generateBirdY = () => {
        const randPositions = [0, 50, 150, 200, 250, 280, 350, 400];
        const getPosition = Math.round(
          Math.random() * randPositions.length - 1
        ); //generate random arr index
        const result = randPositions[Math.abs(getPosition)];
        if (typeof result === "number") {
          return result;
        }
        return generateBirdY();
      };

      const BoardElementSpeed = {
        tree: 2,
        bird: 3,
        birdZ: 4
      };
      const BoardElementSize = {
        tree: 200,
        bird: 40
      };
      const creationType = creationName === "birdZ" ? "bird" : creationName;

      return this.board.children.push(
        new BoardElement(
          creationName,
          "",
          this.board.children.length,
          creationType === "tree"
            ? {
                x: 700,
                y: this.board.maxY - 200
              }
            : {
                x: 700,
                y: generateBirdY()
              },
          {
            w: BoardElementSize[creationType],
            h: BoardElementSize[creationType]
          },
          BoardElementSpeed[creationType],
          creationType,
          false
        )
      );
    };
    switch (type) {
      case "bird":
        createObstacle("bird");
        break;
      case "birdZ":
        createObstacle("birdZ");
        break;
      case "tree":
        createObstacle("tree");
        break;
      case "player":
        createPlayer();
        break;
      default:
        null;
    }
  }

  render(el) {
    const parent = this.board.dom;
    const child = document.createElement("div");
    child.setAttribute("id", `${el.name}${el.id}`);
    child.classList.add(`${el.name}`, `${el.type}`);
    child.style.left = el.position.x + "px";
    child.style.top = el.position.y + "px";
    child.style.width = el.size.w + "px";
    child.style.height = el.size.h + "px";
    child.style.backgroundRepeat = "round";

    switch (el.name.toLowerCase()) {
      case "birdz":
        child.style.backgroundImage = "url('img/bird_eagle.png')";
        break;
      case "bird":
        child.style.backgroundImage = "url('img/bird_gull.png')";
        break;
      case "tree":
        child.style.backgroundImage = "url('img/tree3.png')";
        break;
      case "player":
        child.style.backgroundImage = "url('img/player_plane.png')";
        break;
      default:
        throw Error("Unresolved element name in game render");
    }
    parent.appendChild(child);
    el.dom = document.getElementById(`${el.name}${el.id}`);
  }

  handleCollision() {
    const boardElements = this.board.children;
    const player = this.board.children[0];
    for (let i = 1; i < boardElements.length; i++) {
      const currentX = boardElements[i].position.x
      const currentY = boardElements[i].position.y
      const currentSize = boardElements[i].size.w
      const dx = player.position.x - currentX
      const dy = player.position.y - currentY
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (
        distance < player.size.w / 2 + currentSize / 2
      ) {
        return this.stop();
      }
    }
  }
  destroy(el) {
    const destroy = el => {
      if (el.destroyed) {
        return;
      }

      el.destroyed = true;
      Object.freeze(el);
    };
    el.hasOwnProperty("length")
      ? el.forEach(element => destroy(element))
      : destroy(el);
  }
  handleDestroy() {
    const boardElements = this.board.children;
    for (let i = 1; i < boardElements.length; i++) {
      if (boardElements[i].position.x < 0 - boardElements[i].size.w) {
        this.destroy(boardElements[i]);
      }
    }
  }
  boardBtns() {
    const hideBtns = () => {
      this.board.btns.forEach(e => e.style.display = 'none')
    }
    const [backBtn, startBtn, helpBtn] = this.board.btns
    const removeEventListeners = () => {
      backBtn.removeEventListener('click', previousPage)
      startBtn.removeEventListener('click', startGame)
      helpBtn.removeEventListener('click', popHelpModal)
    }
    const previousPage = () => {
      console.log('prevPage')
      removeEventListeners()
    }
    const startGame = () => {
      backBtn.removeEventListener('click', startGame)
      this.start()
      removeEventListeners()
    }
    const popHelpModal = () => {
      console.log('pophelpmodal')
      removeEventListeners()
    }
    const setEventListeners = () => {
    backBtn.addEventListener('click', previousPage)
    startBtn.addEventListener('click', startGame)
    helpBtn.addEventListener('click', popHelpModal)
  }
  setEventListeners()
    this.activeListeners.push(backBtn, startBtn, helpBtn)
  }
  start() {

    const testLoop = () => {
      const creation = setInterval(() => {
        game.create("bird");
        game.render(this.board.children[this.board.children.length - 1]);
      }, 4000);
      const collision = setInterval(() => {
        this.handleCollision();
      }, 1);
      const elementsMove = setInterval(() => {
        const boardElements = this.board.children;
        for (let i = 1; i < boardElements.length; i++) {
          boardElements[i].move("left");
        }
      }, 10);
      const destroy = setInterval(() => {
        this.handleDestroy();
      }, 2000);
      this.activeIntervals.push(creation, elementsMove, collision, destroy);
    };

    this.create("player");
    this.render(this.board.children[0]);
    document.addEventListener(
      "keydown",
      this.board.children.filter(el => el.type === "player")[0].keySupport
    );

    requestAnimationFrame(testLoop);
  }
  stop() {
    const clearIntervals = arr => {
      arr.hasOwnProperty("length")
        ? arr.forEach(el => {
            clearInterval(el);
          })
        : clearInterval(arr);
    };
    const clearBoard = () => {
      this.board.children = [];
    };
    clearIntervals(this.activeIntervals);
    // clearBoard();
    Object.freeze(this.board.children[0]);
  }
}

const game = new Game();
game.boardBtns()