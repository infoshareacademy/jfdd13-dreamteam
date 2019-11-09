let id = 1;
const speed = 1;
const speedObst = 1;
const speedBird = 2;
const body = document.querySelector('body');
const board = {
  domEl: document.querySelector('.board')
};
const obstacleArr = [];
const startBtn = document.getElementById('start__btn');
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
    // console.log(`this ${el.type} el id is ${el.id}`);
 
    parentVar.appendChild(child);
    el.domEl = document.getElementById(`${el.name}${el.id}`);

    // where we create new object - depends on its type
    if (el.type === 'obstacle') {
      child.style.left = el.position.x+ 'px';        
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
  static changePosition(domEl) {

    const obstEl = document.querySelectorAll('.obstacle');
    const birdEl = document.querySelectorAll('.bird');
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
          console.log(`${el.name} in on` + x)
          BoardElement.move(obstEl)
      })
     } else if (el.type ==='bird'){
      x = birdEl.forEach((item,index)=> {
        (item.name==='bird').offsetLeft + 'px';
        // console.log(x)
        BoardElement.move(birdEl)
      }) 

      // for (let i=0; i<5; i++){
      
      // BoardElement.move(domEl)
      
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
  static move() {
    this.x -=speed;
    this.y -=speed;


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
    this.position = {x:700, y:position.y};
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
generateRandomY = element =>  {
  const bH = board.domEl.offsetHeight;
  const randomY = Math.floor(Math.random() * 300) + 300;
    return element.style.top = bH - randomY + 'px'
};

startBtn.addEventListener('click', startGame);