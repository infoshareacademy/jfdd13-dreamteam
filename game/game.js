

let id = 0;

const 
  body = document.querySelector('body'),
  board = {
    domEl: document.querySelector('.board')
    },
  startBtn = document.getElementById('start__btn');
  instBtn = document.getElementById('inst__btn');

const 
  playerWidth = 40,
  playerHeight = 40,
  obstWidth = 40,
  obstHeight = 200,
  birdWidth = 20,
  birdHeight = 20,
  boardWidth = 600,
  boardHeight = 600,
  boardStart = 0,
  speed = 1,
  speedObst = 1,
  speedBird = 2,
  childrenArray = [],  

  generateRandomY = element =>  {
    const bH = board.domEl.offsetHeight;
    const randomY = Math.floor(Math.random() * 300) + 300;
      return bH - randomY 
  },

startGame = () => {
  startBtn.style.display = 'none';
  instBtn.style.display = 'none';
  event.preventDefault();
  document.addEventListener("keydown", event => Render.KeySupport(Player, event));
  
  firstLoop = () => {
    Render.create(createPlayer('pilot'));    
    Render.create(createBird('ufo'));
    Render.create(createObstacle('dom'));
  };
  obstacleLoop = () => {
    Render.create(createObstacle('o'));
  };
  birdLoop = () => {
    Render.create(createBird('b'));
  };
  birdZLoop = () => {
    Render.create(createBirdZ('zet'));
  };
  mainLoop = () => {
    setInterval(obstacleLoop,12000);
    setInterval(birdLoop,6000);
    setInterval(birdZLoop,9000);  
  };
  
  setTimeout(firstLoop, 300);
  setInterval(Render.changePosition,100);
  mainLoop();
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

    if (el.type === 'player') {
      child.style.width = playerWidth + 'px';
      child.style.height = playerHeight + 'px';
      child.style.background = `blue`;
      child.setAttribute('class', `player`);
     
    } else if (el.type === 'obstacle') {
      child.style.width = obstWidth + 'px';
      child.style.height = obstHeight + 'px';
      child.style.background = `grey`;
      child.setAttribute('class', `obstacle ${el.name}`);
     
    } else if (el.type === 'bird' || el.type === 'birdZ') {
      child.style.width = birdWidth + 'px';
      child.style.height = birdHeight +'px';
      child.style.background = `red`;
      child.setAttribute('class', `bird ${el.name}`);
    }
    // console.log(`this ${el.type} el id is ${el.id}`);

    child.style.left = el.position.x + 'px';
    child.style.top = el.position.y + 'px';
    parentVar.appendChild(child);
    el.domEl = document.getElementById(`${el.name}${el.id}`);

    console.log('create', el.name);
    childrenArray.push(el);

    // console.log(`this el position y is ${el.position.y}`);
  };

  static styleEl(el, arg, output) {
    el.style.arg = output;
    // document.getElementById('player').style.background = red
  };

  static changePosition(domEl) {
    childrenArray.forEach((el,i) =>{
      let x = el.position.x;
      let y = el.position.y;
      // console.log(`child x= ${x}`);
      
      if(el.type==='player'){  
        el.domEl.style.left = x + 'px';
        el.domEl.style.top = y + 'px';  
      };
      if(el.type==='obstacle'){
        el.moveObst();
        el.domEl.style.left = x + 'px';
      };
      if(el.type==='bird'){
        el.moveBird();
        el.domEl.style.left = x + 'px';
      };
      if(el.type==='birdZ'){
        el.moveBirdZ();
        el.domEl.style.left = x + 'px';
        el.domEl.style.top = y + 'px';  
      };

    });         
  };
  static KeySupport(domEl, event) {
    childrenArray.forEach((el,i) =>{
  
      if(el.type==='player'){
      switch (event.code) {
        case "ArrowLeft":
          if(el.position.x > 0) {
            el.playerLeft()
          };

          // Player.changePosition();
          break;
        case "ArrowRight":
          if(el.position.x + 40 < boardWidth) {
            el.playerRight()
          };
  
          break;
        case "ArrowUp":
          if(el.position.y > 20) {
            el.playerUp()
          };
  
          break;
        case "ArrowDown":
          if(el.position.y + 40 < boardHeight) {
            
            el.playerDown()
          };
  
          break;
        default:
          return
        };
      };
    });
  };

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
  }
  moveBirdZ(){
    this.position.x -= this.speed;
    this.position.y += this.speed /4;
  }
}
/////////

class Player extends BoardElement {
  constructor(name, domEl, id, position={x:'',y:''}, speed, type) {
    super(domEl, position);
    this.name = name;
    this.id = id;
    this.position.x = position.x;
    this.position.y = position.y;
    this.speed = speed;
    this.type = type;
  }
  boardBlock(){
    this.position.x > boardStart || this.position.x + playerWidth < boardWidth || 
    this.position.y > boardStart || this.position.y + playerHeight < boardHeight;
  }
  playerLeft(){
  this.position.x -= this.speed / 2 ;
  }
  playerRight(){
    this.position.x += this.speed;
  }
  playerUp(){
    this.position.y -= this.speed * 4;
  }
  playerDown(){
    this.position.y += this.speed * 4;
  }
}

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
// const play = new Player( 'Andrzej', '', 0, 'speed', 'player')
createPlayer = (name) => {
  return new Player(name, '', 0, {x:100,y:200}, speed, 'player');
};
createObstacle = (name) => {
  return new Obstacle(name, '', '', {x:700,y:400}, speedObst, 'obstacle');
};
createBird = (name) => {
  return new Bird(name, '', '', {x:700,y:generateRandomY()}, speedBird, 'bird')
};
createBirdZ = (name) => {
  return new Bird(name, '', '', {x:700,y:generateRandomY()}, speedBird, 'birdZ')
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