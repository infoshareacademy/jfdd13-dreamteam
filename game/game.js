

let id = 1;

const 
  body = document.querySelector('body'),
  board = {
    domEl: document.querySelector('.board')
    },
  
  obstEl = document.querySelectorAll('.obstacle'),
  birdEl = document.querySelectorAll('.bird'),
  
  startBtn = document.getElementById('start__btn');

const 
  obstWidth = '20px',
  obstHeight = '200px',
  birdWidth = '20px',
  birdHeight = '20px',
  speed = 1,
  speedObst = 1,
  speedBird = 2,
  obstacleArr = [];  

  generateRandomY = element =>  {
    const bH = board.domEl.offsetHeight;
    const randomY = Math.floor(Math.random() * 300) + 300;
      return bH - randomY 
  };

const startGame = () => {
  startBtn.style.display = 'none';
  event.preventDefault();

  for (let i=0; i<5; i++) {
    Render.create(createBird('ufo'));
    Render.create(createObstacle('dom'));
    obstacleArr.push();
  }
  // Render.changePosition()
  setInterval(() => Render.changePosition(),3000,);
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

    obstacleArr.push(el);

    console.log(`this el position y is ${el.position.y}`);
  }

  static styleEl(el, arg, output) {
    el.style.arg = output;
    // document.getElementById('player').style.background = red
  }
  static changePosition(domEl) {

    // obstEl.offsetLeft;
    // birdEl.offsetLeft;
    // const obstElY = document.querySelector('.obstacle').offsetTop;
    // const birdElY = document.querySelector('.bird').offsetTop;
    // console.log(obstElX,obstElY,birdElX,birdElY);

    obstacleArr.forEach((el,i) =>{
      
      let x = el.position.x;
      
      if (el.type==='obstacle'){
        x = obstEl.forEach((item,index)=> {
          (item.name==='obstacle').offsetLeft + 'px';
          // console.log(`${el.name} in on` + x)
          BoardElement.move(obstEl)
      })
     } else if (el.type ==='bird'){
      x = birdEl.forEach((item,index)=> {
        (item.name==='bird').offsetLeft + 'px';
        // console.log(x)
        BoardElement.move(birdEl)
      }) 
      
      }
    })
  }

  // static changePosition(el) {

  //   const obstEl = document.querySelector('.obstacle');
  //   const birdEl = document.querySelector('.bird');
  //   const obstElX = obstEl.offsetLeft;
  //   const obstElY = obstEl.offsetTop;
  //   const birdElX = birdEl.offsetLeft;
  //   const birdElY = birdEl.offsetTop;
  //   console.log(obstElX,obstElY,birdElX,birdElY);

  //   obstacleArr.forEach((el,i) =>{
  //     el.position.x = obstElX
  //   });

      // birdEl.style.top = e.position.y + 'px';
    // });

  //   birdEl.forEach((el,iter)=>{
  //     birdEl.style.left = elX + 'px';
  //     birdEl.style.top = elY + 'px';
  //     birdEl.move();
  //   });

  // }
  static destroy(el) {

  }
  //destroy element

}

class BoardElement {

  constructor(name, domEl, id, position={}, speed, type) {
    this.name = name;
    this.domEl = domEl;
    this.id = id;
    this.position = position;
    this.position.x = position.x;
    this.position.y = position.y;
    this.speed = speed;
    this.type = type;
  }

  static move(domEl, position) {
    this.position.x -= speed;
    this.position.y -= speed;


    // Render
  }
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
  constructor(name, domEl, id, position, speed, type) {
    super(domEl, id)
    this.name = name;
    this.position = {x:700, y:400};
    this.speed = speedObst;
    this.type = 'obstacle'
  }
}
class Bird extends BoardElement {
  constructor(name, domEl, id, position, speed, type) {
    super(domEl, id)
    this.name = name;
    this.position = {x:700, y:generateRandomY(domEl)};
    this.speed = speedBird;
    this.type = 'bird'
  }
}


createObstacle = (name) => {
  return new Obstacle(name, '', '', {}, 1, '')
};
createBird = (name) => {
  return new Bird(name, '', '', {}, 1, '')
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

const startGame = () => {
  gameStarted();


setTimeout(() => {
  gameCompleted(Math.random() * 200)
  setTimeout(() => {
    startGame()
  }, 1000)
  }, 5000)
}


startGame();

//tu się kończy