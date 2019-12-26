export class BoardElement {
  constructor(
      name,
      domEl,
      id,
      position = {x: "", y: ""},
      size = {w: "", h: ""},
      speed,
      type
  ) {
    this.name = name;
    this.domEl = domEl;
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

  playerLeft() {
    this.position.x -= this.speed / 2;
  }

  playerRight() {
    this.position.x += this.speed;
  }

  playerUp() {
    this.position.y -= this.speed * 4;
  }

  playerDown() {
    this.position.y += this.speed * 4;
  }

  moveObst() {
    this.position.x -= this.speed;
  }

  moveBirdZ() {
    this.position.x -= this.speed;
    this.position.y += this.speed / 4;
  }
}

export class Player extends BoardElement {
  constructor(
      name,
      domEl,
      id,
      position = {x: "", y: ""},
      size = {w: "", h: ""},
      speed,
      type
  ) {
    super(domEl, position, size);
    this.name = name;
    this.id = id;
    this.position.x = position.x;
    this.position.y = position.y;
    this.size.w = size.w;
    this.size.h = size.h;
    this.speed = speed;
    this.type = type;
  }
}

export class Obstacle extends BoardElement {
  constructor(
      name,
      domEl,
      id,
      position = {x: "", y: ""},
      size = {w: "", h: ""},
      speed,
      type
  ) {
    super(domEl, id, position, size);
    this.name = name;
    this.position.x = position.x;
    this.position.y = position.y;
    this.size.w = size.w;
    this.size.h = size.h;
    this.speed = speed;
    this.type = type;
  }
}
