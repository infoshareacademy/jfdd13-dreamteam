let id = 1;
let speed = 1;
const body = document.querySelector('body');
const board = {
  domEl: document.querySelector('.board')
};
const obstacleArr = [];

class Render {
  static create(el, parent = board.domEl) {
    const parentVar = parent //direct parent - board in DOM
    // console.log(`parentVar in create is ${parentVar}`);
    const child = document.createElement('div');

    //add id
    el.id = id++;
    child.innerText = el.name;
    child.setAttribute('id', `${el.name}${el.id}`);

    if (el.type === 'obstacle') {
      child.style.width = `20px`;
      child.style.height = `200px`;
      child.style.background = `grey`;
      child.setAttribute('class', `obstacle ${el.name}`);
      obstacleArr.push(el);
     
    } else if (el.type === 'bird') {
      child.style.width = `20px`;
      child.style.height = `20px`;
      child.style.background = `red`;
      child.setAttribute('class', `bird ${el.name}`);
      obstacleArr.push(el);
    }
    console.log(`this ${el.type} el id is ${el.id}`);
 
    parentVar.appendChild(child);
    el.domEl = document.getElementById(`${el.name}${el.id}`);

    // where we create new object - depends on its type
    if (el.type === 'obstacle') {
      child.style.left = el.position.x+ 'px'        
      child.style.top = el.position.y+ 'px';
    } else if (el.type === 'bird') {
      child.style.left = el.position.x+ 'px'        
      el.position.y = generateRandomY(el.domEl);
    }
    console.log(`this el position y is ${el.position.y}`);
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
    super(domEl, id)
    this.name = name;
    this.position = {x:700, y:400};
    this.speed = 1;
    this.type = 'obstacle'
  }
}
class Bird extends BoardElement {
  constructor(name, domEl, id, position, speed, type) {
    super(domEl, id)
    this.name = name;
    this.position = {x:700, y:position.y};
    this.speed = 2;
    this.type = 'bird'
  }
}


createObstacle = (name) => {
  return new Obstacle(name, '', '', {x:600,y:600}, 1, '')
}
createBird = (name) => {
  return new Bird(name, '', '', {x:600,y:''}, 1, '')
}

function definePosition(element) {
  const randomX = 200;
}

// generatePositionX = element => {
//   const bW = board.domEl.offsetWidth;
//   return element.style.left = bW +100 + 'px'
// }

// generateFixedY = element => {
//   const bH = board.domEl.offsetHeight;
//     return element.style.top = bH -200 + 'px'
// }
generateRandomY = element =>  {
  const bH = board.domEl.offsetHeight;
  const randomY = Math.floor(Math.random() * 300) + 300;
    return element.style.top = bH - randomY + 'px'
}