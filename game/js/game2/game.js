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
    type
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
    type
  ) {
    super(name, dom, id, position, size, speed, type);
  }
  move(direction) {
    switch(direction) {
      case 'Left': this.position.x -= this.speed;
      break;
      case 'Right': this.position.x += this.speed;
      break;
      case 'Up': this.position.y += this.speed;
      break;
      case 'Down': this.position.y -= this.speed
    }
    console.log(this.position)
  }
}
