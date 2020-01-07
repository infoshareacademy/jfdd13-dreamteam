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
  move(direction) {
    if (typeof direction === "string") {
      switch (direction.toLowerCase()) {
        case "left":
          this.position.x -= this.speed;
          break;
        case "right":
          this.position.x += this.speed;
          break;
        case "up":
          this.position.y += this.speed;
          break;
        case "down":
          this.position.y -= this.speed;
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

const playa = new Player(
  "playa",
  "",
  0,
  { x: 0, y: 0 },
  { w: 10, h: 10 },
  1,
  "player"
);

class Game {
  board = new Board(
    document.getElementById("board"),
    [],
    0,
    () => board.dom.offsetWidth,
    0,
    () => board.dom.offsetHeight
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
    const createObstacle = creationType => {
      //generateBirdY is possible to export
      const generateBirdY = () => {
        const randPositions = [250, 300, 350, 400, 450, 480, 550, 600];
        const getPosition = Math.round(
          Math.random() * randPositions.length - 1
        ); //generate random arr index
        console.log(getPosition);
        const result = randPositions[Math.abs(getPosition)];
        console.log(result);
        if (typeof result === "number") {
          return result;
        }
        return generateBirdY();
      };
      return this.board.children.push(
        new BoardElement(
          creationType,
          "",
          this.board.children[this.board.children.length].id + 1,
          creationType === "tree"
            ? {
                x: 700,
                y: this.board.maxY - 200
              }
            : ""
        )
      );
    };
    switch (creationType) {
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
  render(el) {}
}

const game = new Game();
