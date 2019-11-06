console.log('dupa1')
class Render {
  static create(el) {

  }
}

class BoardElement {
  constructor(name, domEl, id, position, speed) {
  this.name = name;
  this.domEl = domEl;
  this.id = id;
  this.position = position;
  this.speed = speed;
  }
  static move () {
    console.log(msg)
  }
}

class Player extends BoardElement {
  constructor(name, domEl, id, position, speed){
  super (position, speed)
  this.name = 'player';
  this.domEl = document.querySelector('#player');
  this.id = 0

  }
}
const play = new Player('Andrzej', '', 0, '', '')

class Obstacle extends BoardElement {
  constructor(name, domEl, id, position, speed){
  super (domEl, id, position, speed)
  this.name = name;


  }
}
