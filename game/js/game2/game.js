class Board {
  constructor(dom, children, minX, maxX, minY, maxY) {
    this.dom = dom;
    this.children = children;
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
    if (typeof direction === "string") {
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
      console.log(this.position);
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
  keySupport = e => {
    switch (e.key) {
      case "ArrowLeft":
        this.move("left");
        break;
      case "ArrowRight":
        this.move("right");
        break;
      case "ArrowUp":
        this.move("up");
        break;
      case "ArrowDown":
        this.move("down");
    }
  };
}

class Game {
  getBoard() {
    return document.getElementById("board");
  }
  board = new Board(
    this.getBoard(),
    [],
    0,
    this.getBoard().offsetWidth,
    0,
    this.getBoard().offsetHeight
  );
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
          1,
          "player",
          false
        )
      );
    };
    const createObstacle = creationName => {
      //generateBirdY is possible to export
      const generateBirdY = () => {
        const randPositions = [250, 300, 350, 400, 450, 480, 550, 600];
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
  start() {
    this.create("player");
    this.render(this.board.children[0]);
    document.addEventListener("keydown", this.board.children[0].keySupport);
  }
  handleCollision() {
    
    const boardElements = this.board.children;
    const player = this.board.children[0];
    if (
      player.position.x <= this.board.maxX &&
      player.position.x >= this.board.minX &&
      player.position.y >= this.board.maxY &&
      player.position.y >= this.board.minY
      ) {
      console.log('player can move')
    }
    boardElements.forEach(element => {
      
      if (
        element.type !== "player" &&
        element.position.x === player.position.x &&
        element.position.y === player.position.y
      ) {
        
        console.log('collision in da house')
      }
    });
  }
}

const game = new Game();
game.start();
