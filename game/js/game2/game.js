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
    this.destroyed = destroyed
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
  create(creationType) {
    const creationTypes = ["player", "bird", "birdZ", "tree"];
    const createPlayer = () => {
      return new Player(
        "player",
        document.getElementById("player"),
        0,
        {
          x: 160,
          y: 160
        },
        { w: 50, h: 50 },
        1,
        "player"
      );
    };
    const createObstacle = () => {
      return;
    };
  }
  render(el) {}
}
