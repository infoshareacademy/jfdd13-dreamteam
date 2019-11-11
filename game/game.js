

let id = 1;

const 
  body = document.querySelector('body'),
  board = {
    domEl: document.querySelector('.board')
    },
  startBtn = document.getElementById('start__btn');

const 
  obstWidth = '20px',
  obstHeight = '200px',
  birdWidth = '20px',
  birdHeight = '20px',
  speed = 1,
  speedObst = 1,
  speedBird = 2,
  childrenArray = [];  

  generateRandomY = element =>  {
    const bH = board.domEl.offsetHeight;
    const randomY = Math.floor(Math.random() * 300) + 300;
      return bH - randomY 
  };

const startGame = () => {
  startBtn.style.display = 'none';
  event.preventDefault();

  //for (let i=0; i<5; i++) {
    Render.create(createBird('ufo'));
    Render.create(createObstacle('dom'));
  //}

  setInterval(Render.changePosition,100);
};

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
      child.style.width = obstWidth;
      child.style.height = obstHeight;
      child.style.background = `grey`;
      child.setAttribute('class', `obstacle ${el.name}`);
     
    } else if (el.type === 'bird') {
      child.style.width = birdWidth;
      child.style.height = birdHeight;
      child.style.background = `red`;
      child.setAttribute('class', `bird ${el.name}`);
    }
    // console.log(`this ${el.type} el id is ${el.id}`);

    child.style.left = el.position.x + 'px';
    child.style.top = el.position.y + 'px';
    parentVar.appendChild(child);
    el.domEl = document.getElementById(`${el.name}${el.id}`);

    console.log('create', el);
    childrenArray.push(el);

    // console.log(`this el position y is ${el.position.y}`);
  }

  static styleEl(el, arg, output) {
    el.style.arg = output;
    // document.getElementById('player').style.background = red
  }

  static changePosition(domEl) {
    childrenArray.forEach((el,i) =>{
      let x = el.position.x;
      console.log(`child x= ${x}`);
      if(el.type==='obstacle'){
      el.moveObst();
      el.domEl.style.left = el.position.x + 'px';
      }
      

    })         
  
  }

 
  static destroy(el) {

  }
  //destroy element

}

class BoardElement {
  constructor(name, domEl, id, position = {x:'',y:''}, speed, type) {
    this.name = name;
    this.domEl = domEl;
    this.id = id;
    this.position = position;
    this.position.x = position.x;
    this.position.y = position.y;
    this.speed = speed;
    this.type = type;
 }

  moveObst() {
    this.position.x -= this.speed;
  }
  moveBird(){
    this.position.x -= this.speed;
    this.position.y -= this.speed;
  }
    // console.log(this.position.x);

    // Render
  
}
  // static changePosition(el, x, y) {
  //   this.x = x
  //   this.y = y
  //   const elX = el.position.x
  //   const elY = el.position.y
  


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
  constructor(name, domEl, id, position={x:'',y:''}, speed, type) {
    
    super(domEl, id, position);
    this.name = name;
    this.position.x = position.x;
    this.position.y = position.y;
    this.speed = speed;
    this.type = type;
  }
}
class Bird extends BoardElement {
  constructor(name, domEl, id, position, speed, type) {
    super(domEl, id, position);
    this.name = name;
    this.position.x = position.x;
    this.position.y = position.y;
    this.speed = speed;
    this.type = type;
  }
}

createObstacle = (name) => {
  return new Obstacle(name, '', '', {x:700,y:400}, speedObst, 'obstacle');
};
createBird = (name) => {
  return new Bird(name, '', '', {x:700,y:generateRandomY()}, speedBird, 'bird')
};

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
// generateRandomY = element =>  {
//   const bH = board.domEl.offsetHeight;
//   const randomY = Math.floor(Math.random() * 300) + 300;
//     return element.style.top = bH - randomY
// };

startBtn.addEventListener('click', startGame);



//high score

const getHighScore = () => localStorage.getItem('highscore') || 0

const newScoreReceived = (value) => {
  console.log(value, getHighScore())
    if (value > getHighScore() ){
      console.log('new highScore!')
        localStorage.setItem('highscore', value)
    } else {
      console.log('lower')
    }
}

const gameStarted = () => {
  displayScore(getHighScore())
}

const gameCompleted = (score) => {
  newScoreReceived(score);
  displayScore(score);
}


const displayScore = (value) =>
document.getElementById('highscore').innerText = value;

const startGame1 = () => {
  gameStarted();


  setTimeout(() => {
    gameCompleted(Math.random() * 200)
    setTimeout(() => {
      startGame1()
    }, 1000)

    }, 5000)
}


startGame1();

//tu się kończy