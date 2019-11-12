let id = 0;

const
    body = document.querySelector('body'),
    board = {
        domEl: document.querySelector('.board')
    },
    startBtn = document.getElementById('start__btn'),
    instBtn = document.getElementById('inst__btn'),
    backBtn = document.getElementById('back__btn');

const
    playerWidth = 40,
    playerHeight = 40,
    obstWidth = 100,
    obstHeight = 200,
    birdWidth = 40,
    birdHeight = 40,
    boardWidth = 600,
    boardHeight = 600,
    speed = 1,
    speedObst = 10,
    speedBird = 10,
    childrenArray = [],

    backToMenu = () => {
        document.location.assign('../index.html');
    };

    startGame = () => {
        startBtn.style.display = 'none';
        instBtn.style.display = 'none';
        backBtn.style.display = 'none';
        event.preventDefault();
        document.addEventListener("keydown", event => Render.KeySupport(Player, event));

        checkPosition = () => {
            const outOfTheBoard = childrenArray.map(item => item.position.x < -obstWidth);
            const trashItem = outOfTheBoard.indexOf(true);
            if (trashItem > 0)  {

                Render.destroy(childrenArray[trashItem])
            }

        };

        firstLoop = () => {
            Render.create(createPlayer('pilot'));
            Render.create(createBird('bird'));
            Render.create(createObstacle('obstacle'));
        };
        obstacleLoop = () => {
            Render.create(createObstacle());
        };
        birdLoop = () => {
            Render.create(createBird());
        };
        birdZLoop = () => {
            // Render.create(createBirdZ('zet'));
        };
        mainLoop = () => {
            setInterval(checkPosition, 100);
            setInterval(obstacleLoop, 5000);
            setInterval(birdLoop, 1900);
            setInterval(birdZLoop, 9000);
            //further 4 lines just for testing purposes
            // birdLoop()


        };
        countdown();
        setTimeout(firstLoop, 300);
        const draw = () => setInterval(Render.changePosition, 100);
        requestAnimationFrame(draw);
        mainLoop()
    };

// document.addEventListener("keydown", event => Render.KeySupport(Player, event)); //added just for testing
class Render {

    static create(el, parent = board.domEl) {
        const parentVar = parent //direct parent - board in DOM
        // console.log(`parentVar in create is ${parentVar}`);
        const child = document.createElement('div');

        //add id
        el.id = id++;
        // child.innerText = el.name;
        child.setAttribute('id', `${el.name}${el.id}`);

        if (el.type === 'player') {
            child.style.width = playerWidth + 'px';
            child.style.height = playerHeight + 'px';
            // child.style.background = `blue`;
            child.setAttribute('class', `player`);
            child.style.backgroundImage = "url('img/ptasiek.png')";
            child.style.backgroundRepeat = 'round';
      

        } else if (el.type === 'obstacle') {
            if (el.name === 'bird') {
                child.style.width = birdWidth + 'px';
                child.style.height = birdHeight + 'px';
                // child.style.backgroundColor = 'red';
                child.style.left = el.position.x + 'px';
                child.style.top = el.position.y + 'px';
                // console.log(el.name);
                child.style.backgroundImage = "url('img/bird_gull.png')";
                child.style.backgroundRepeat = 'round';
          
            } else if (el.name === 'obstacle') {
                child.style.width = obstWidth + 'px';
                child.style.height = obstHeight + 'px';
                // child.style.background = `grey`;
                child.style.bottom = `0px`;
                child.style.backgroundImage = "url('img/tree1.png')";
                child.style.backgroundRepeat = 'round';

            }
            child.setAttribute('class', `obstacle ${el.name}`);
        } else {
            throw Error('unresolved object type in render create, line 90')
        }
        // else if (el.type === 'bird' || el.type === 'birdZ') {
        //     child.style.width = birdWidth + 'px';
        //     child.style.height = birdHeight + 'px';
        //     child.style.background = `red`;
        //     child.setAttribute('class', `bird ${el.name}`);
        // }
        // console.log(`this ${el.type} el id is ${el.id}`);

        // child.style.left = el.position.x + 'px';
        // child.style.top = el.position.y + 'px';
        parentVar.appendChild(child);
        el.domEl = document.getElementById(`${el.name}${el.id}`);

        // console.log('create', el.name);
        childrenArray.push(el);

        // console.log(`this el position y is ${el.position.y}`);
    };

    static styleEl(el, arg, output) {
        el.style.arg = output;
        // document.getElementById('player').style.background = red
    };

    static changePosition(domEl) {
        childrenArray.forEach((el, i) => {
            let x = el.position.x;
            let y = el.position.y;
            // console.log(`child x= ${x}`);

            if (el.type === 'player') {
                el.domEl.style.left = x + 'px';
                el.domEl.style.top = y + 'px';
            }
            if (el.type === 'obstacle') {
                el.moveObst();
                el.domEl.style.left = x + 'px';
            }
            if (el.type === 'bird') {
                el.moveObst();
                el.domEl.style.left = x + 'px';
            }
            if (el.type === 'birdZ') {
                el.moveBirdZ();
                el.domEl.style.left = x + 'px';
                el.domEl.style.top = y + 'px';
            }

        });
    };

    static KeySupport(domEl, event) {
        childrenArray.forEach((el, i) => {

            if (el.type === 'player') {
                switch (event.code) {
                    case "ArrowLeft":
                        if (el.position.x > 0) {
                            el.playerLeft()
                        }
                        // Player.changePosition();
                        break;
                    case "ArrowRight":
                        if (el.position.x + 40 < boardWidth) {
                            el.playerRight()
                        }

                        break;
                    case "ArrowUp":
                        if (el.position.y > 20) {
                            el.playerUp()
                        }

                        break;
                    case "ArrowDown":
                        if (el.position.y + 40 < boardHeight) {
                            el.playerDown()
                        }

                        break;
                    default:
                        return
                }
            }
        });
    };

    static destroy(el) {
        el.domEl.style.transition = 'opacity .1s ease-out'
        el.domEl.style.opacity = '0'
        el.domEl.remove();
        el.position.x = 1000;
        el.position.y = -1000;
        return el = 0;
    }

    //destroy element

}

class BoardElement {
    constructor(name, domEl, id, position = {x: '', y: ''}, speed, type) {
        this.name = name;
        this.domEl = domEl;
        this.id = id;
        this.position = position;
        this.position.x = position.x;
        this.position.y = position.y;
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

/////////

class Player extends BoardElement {
    constructor(name, domEl, id, position = {x: '', y: ''}, speed, type) {
        super(domEl, position);
        this.name = name;
        this.id = id;
        this.position.x = position.x;
        this.position.y = position.y;
        this.speed = speed;
        this.type = type;
    }
}

class Obstacle extends BoardElement {
    constructor(name, domEl, id, position = {x: '', y: ''}, speed, type) {

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
    return new Player(name, '', 0, {x: 100, y: 200}, speed, 'player');
};
createObstacle = () => {
    return new Obstacle('obstacle', '', '', {x: 700, y: 400}, speedObst, 'obstacle');
};
createBird = () => {
    return new Obstacle('bird', '', '', {x: 700, y: generateBirdY()}, speedBird, 'obstacle')
};
createBirdZ = (name) => {
    return new Bird(name, '', '', {x: 700, y: generateBirdY()}, speedBird, 'birdZ')
};

// generatePositionX = element => {
//   const bW = board.domEl.offsetWidth;
//   return element.style.left = bW +100 + 'px'
// }

// generateFixedY = element => {
//   const bH = board.domEl.offsetHeight;
//     return element.style.top = bH -200 + 'px'
// }
generateBirdY = () => {
    const randPositions = [250, 300, 350, 400, 450, 480, 550, 600];
    const getPosition = Math.round(Math.random() * randPositions.length - 1); //generate random arr index
    const result = randPositions[getPosition] - 250;
    if (result !== undefined) {
        return result;
    } else { //avoid func return undefined
        return randPositions[0];
    }

};

startBtn.addEventListener('click', startGame);
backBtn.addEventListener('click', backToMenu);



//high score
function highScore() {

    const getHighScore = () => localStorage.getItem('highscore') || 0

    const newScoreReceived = (value) => {
        console.log(value, getHighScore())
        if (value > getHighScore()) {
            console.log('new highScore!')
            localStorage.setItem('highscore', value)
        } else {
            console.log('lower')
        }
    };

    const gameStarted = () => {
        displayScore(getHighScore())
    };

    const gameCompleted = (score) => {
        newScoreReceived(score);
        displayScore(score);
    };

    const displayScore = (value) =>
        document.getElementById('highscore').innerText = `Najlepszy wynik to: ${Math.round(value)}`;

    const startGame1 = () => {
        gameStarted();

        setTimeout(() => {
            gameCompleted(Math.random() * 200)
            setTimeout(() => {
                startGame1()
            }, 1000)

        }, 5000)
    };

    startGame1();

}

const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
};

const countdown = () => {
    const twoMinutes = 60 * 2,
        display = document.querySelector('#countdown');
    startTimer(twoMinutes, display);
};