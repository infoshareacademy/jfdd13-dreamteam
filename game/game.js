class Render {
  static create(el, parent = board.domEl) {
    const parentVar = parent //direct parent - board in DOM
    console.log(`parentVar in create is ${parentVar}`);
    const child = document.createElement('div');


    if (el.type === 'obstacle') {
      //add id
      el.id = id++;
      child.innerText = el.name;
      // child.style.width = `50px`;
      // child.style.height = `50px`;
      child.style.background = `red`;

      child.setAttribute('id', `${el.name}${el.id}`);
      child.setAttribute('class', `obstacle ${el.name}`);

      console.log(`this el is: ${el}`);
      console.log(`this el id is ${el.id}`);
    
      obstacleArr.push(el);

    }

    parentVar.appendChild(child);
    el.domEl = document.getElementById(`${el.name}${el.id}`);

    el.position.x = generatePositionX(el.domEl);
    el.position.y = generatePositionY(el.domEl)
  }

  static styleEl(el, arg, output) {
    el.style.arg = output;
    // document.getElementById('player').style.background = red
  }
  static changePosition(el) {
    el.domEl.style.left = el.position.x + 'px';
    el.domEl.style.top = el.position.y + 'px';
  }
  static destroy(el) {

  }
  //destroy element

}

class BoardElement {

  constructor(name, domEl, id, position, speed, type) {
    this.name = name;
    this.domEl = domEl;
    this.id = id;
    this.position = {

        x: '',
        y: ''

    };
    this.speed = speed;
    this.type = type;
  }
  static move(el) {
    console.log(msg)
    const x = el.position.x
    const y = el.position.y




    // Render
  }
  static changePosition(el, x, y) {
    let elX = el.position.x
    let elY = el.position.y
    elX = x
    elY = y
  }
}

class Player extends BoardElement {
  constructor(name, domEl, id, position, speed, type) {
    super(position, speed)
    this.name = 'player';
    this.domEl = document.querySelector('#player');
    this.id = 0
    this.type = 'player';
  }

  static KeySupport(Player, event) {
    switch (event.code) {
      case "ArrowLeft":
        Player.changePosition();
        break;
      case "ArrowRight":
        Player.right();
        break;
      case "ArrowUp":
        Player.up();
        break;
      case "ArrowDown":
        Player.down();
        break;
      default:
        return
    }
  }
}
const play = new Player('Andrzej', '', 0, '', '')

// const bird = new Obstacle('Bird', document.getElementById('bird'), 1, {[0] : 100, [1]: 200}, 1)


class Obstacle extends BoardElement {
  constructor(name, domEl, id, position, speed, type) {
    super(domEl, id, position, speed)
    this.name = name;
    this.type = 'obstacle'


  }
}

const bird = new Obstacle('Bird', '', 1, {
  [0]: 100,
  [1]: 200
}, 1, 'obstacle');
const obstacleArr = []

let id = 1;
const body = document.querySelector('body');
const board = {
  domEl: document.querySelector('.board')
}

function createObstacle(name) {
  return new Obstacle(name, '', '', {
    x: 100,
    y: 100
  }, 1, '')
}

function definePosition(element) {
  const randomX = 200;
}

function generatePositionX(element) {
  const bW = board.domEl.offsetWidth;
  return element.style.left = bW +100 + 'px'
}

function generatePositionY(element) {
  const bH = board.domEl.offsetHeight
  return element.style.top = bH - 100 + 'px'
}