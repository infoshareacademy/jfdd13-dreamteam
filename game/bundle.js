(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  const instruction = () => {
    const modal = document.getElementById("instBoxM");

  const btn = document.getElementById("inst__btn");

  const span = document.getElementsByClassName("modal__close")[0];
  const closeBtn = document.getElementById("close__btn");

  btn.onclick = function() {
    modal.style.display = "flex";
  };

  span.onclick = function() {
    modal.style.display = "none";
  };

  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  };

  const renderScore = (data, parentEl) => {
    parentEl.innerHTML = '';
    const listContainer = document.createElement("ol");
    listContainer.classList.add('scoreboard__container');
    data.map(item => {
      const domListItem = document.createElement("li");
      const playerEl = document.createElement("span");
      domListItem.classList.add('scoreboard__item');
      playerEl.classList.add('scoreboard__value');
      if (item.name === currentPlayerName) {
        playerEl.style.fontWeight = 'bold';
      }
      playerEl.innerText = item.name;
      domListItem.appendChild(playerEl);
      const scoreEl = document.createElement("span");
      scoreEl.innerText = item.score;
      scoreEl.classList.add('scoreboard__value');
      domListItem.appendChild(scoreEl);
      listContainer.appendChild(domListItem);
    });
    parentEl.appendChild(listContainer);
  };

  const playerName = document.getElementById("playerName");
  let currentPlayerName = '';

  const scoreboard = () => {
    const clearScoresBtn = document.getElementById("clearScores");
    const displayScoresBtn = document.getElementById("displayScores");
    const scoreboard = document.getElementById("scoreboard");
    const scoreboardHeading = document.querySelector(".modal__gameover--h3");
    const saveScoreBtn = document.getElementById("saveScore");

    const resetScore = () => {
      localStorage.setItem("gameScores", JSON.stringify([]));
      localStorage.setItem("highscore", JSON.stringify(0));
      return JSON.parse(localStorage.getItem("gameScores"))
    };
    const getScore = () => JSON.parse(localStorage.getItem("gameScores")) || resetScore();

    const setScore = (data=[]) =>
      localStorage.setItem("gameScores", JSON.stringify(data));
    const addScore = (arr, player, score) => {
      const scoreData = arr;
      const newScoreEntry = {
        name: player,
        score: score,
        date: new Date()
      };
      scoreData.push(newScoreEntry);
      return setScore(scoreData);
    };

    const sortScores = (arr) => {
      const sortedScores = arr.sort((a, b) => {
        if (a.score === b.score) {
          return new Date(b.date) - new Date(a.date);
        }
        if (a.score < b.score) {
          return 1
        } else {
          return -1
        }
      });
      return sortedScores
    };

    const checkScores = arr => {
      if (arr.length) {
        if (arr.length < 10) {
          const output = sortScores(arr);
          return renderScore(output, scoreboard);
        } else {
          const tenScoresArr = sortScores(arr).slice(0, 10);
          setScore(tenScoresArr);
          return renderScore(tenScoresArr, scoreboard);
        }
      }
    };

    const handleScores = () => {
      const scoreData = getScore();
      if (playerName.value !== '') {
        const currentScore = Number(localStorage.getItem('lastScore')) || 0;
        if (currentScore) {
      addScore(scoreData, playerName.value, currentScore);
      currentPlayerName = playerName.value;
      playerName.value = '';
      scoreboardHeading.innerHTML = "Najlepsze wyniki:";
      checkScores(scoreData);
    }}};

    saveScoreBtn.addEventListener("click", () => {
      handleScores();
      document.getElementById('modalInputs').style.display = 'none';
    });

    clearScoresBtn.addEventListener("click", () => {
      resetScore();
    });

    displayScoresBtn.addEventListener("click", () => {
      checkScores(getScore());
      displayScoresBtn.style.display = 'none';
      clearScoresBtn.style.display = 'inline';
      scoreboardHeading.innerHTML = "Najlepsze wyniki:";
    });
  };

  const boardButtons = document.querySelectorAll(".board__btn");
  const backToMenu = () => {
    document.location.assign("../index.html");
  };
  const game = () => {
    let raf = "";
    let pop = "";
    let id = 0,
      seconds = 0,
      minutes = 0;

    const board = document.querySelector(".board"),
      clock = document.getElementById("clock");

    const playerWidth = 50,
      playerHeight = 40,
      obstWidth = 200,
      obstHeight = 200,
      treeCorr = 0.5,
      birdWidth = 40,
      birdHeight = 40,
      birdCorr = 0.8,
      boardStart = 0,
      boardWidth = 600,
      boardHeight = 600,
      startLine = 160,
      creationLine = 700,
      speed = 2,
      speedObst = 1,
      speedBird = 2,
      speedBirdZ = 2,
      childrenArray = [],
      birdsArray = [],
      treesArray = [],
      intervals = [],
      timeouts = [];

    const displayElements = (el, param, override = null) => {
      let visible = param ? "inline-block" : "none";
      if (el) {
        if (el.hasOwnProperty(length)) {
          el.forEach(btn => (btn.style.display = override || visible));
        } else {
          el.style.display = override || visible;
        }
      }
    };
    const refreshBoard = () => {
      location.reload(board);
      displayElements(boardButtons, true);
      boardButtons[1].addEventListener("click", startGame);
      boardButtons[0].addEventListener("click", backToMenu);
    };
    const timer = () => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        clock.innerText = minutes + ":" + seconds;
      }
      clock.innerText = "Czas: " + seconds + " sek.";
    };
    const startTimer = () => {
      const timerInt = setInterval(timer, 1000);
      intervals.push(timerInt);
    };
    const getHighScore = () => localStorage.getItem("highscore") || localStorage.getItem("lastScore") || 0;
    // displayHighScore(getHighScore());

    const highScore = () => {
      const score = () => {
        const scoreDOM = document.getElementById("score");
        const value = Math.floor(seconds * 10);
        const currentHighscore = getHighScore();
        scoreDOM.innerText = `Twój wynik: ${value}`;
        localStorage.setItem("lastScore", value.toString());
        if (value > currentHighscore) {
          localStorage.setItem("highscore", value.toString());
        }
      };

      const gameStarted = () => {
        setInterval(() => {
          score();
        }, 1000);
      };
      const getScore = () => {
        gameStarted();
      };

      getScore();
    };
    const startGame = () => {
      displayElements(boardButtons, false);
      removeEventListener("click", boardButtons[1]);
      removeEventListener("click", boardButtons[0]);
      document.addEventListener("keydown", event =>
        Render.KeySupport(Player, event)
      );

      const checkPosition = () => {
        const outOfTheBoard = childrenArray.map(
          item => item.position.x < -obstWidth
        );
        const trashItem = outOfTheBoard.indexOf(true);
        if (trashItem > 0) {
          Render.destroy(childrenArray[trashItem]);
        }
      };

      const firstLoop = () => {
        Render.create(createPlayer());
        Render.create(createBird());
        Render.create(createObstacle());
      };

      const obstacleLoop = () => {
        Render.create(createObstacle());
      };
      const birdLoop = () => {
        Render.create(createBird());
      };
      const birdZLoop = () => {
        Render.create(createBirdZ());
      };
      const mainLoop = () => {
        const draw = setInterval(Render.changePosition, 10),
          int1 = setInterval(checkPosition, 10),
          int2 = setInterval(checkCollision, 1),
          int3 = setInterval(obstacleLoop, 5000),
          int4 = setInterval(birdLoop, 2000),
          int5 = setInterval(birdZLoop, 8000),
          lev2 = setTimeout(level2, 10000),
          lev3 = setTimeout(level3, 20000);
        intervals.push(draw, int1, int2, int3, int4, int5);
        timeouts.push(lev2, lev3);
      };
      const level2 = () => {
        const int6 = setInterval(birdLoop, 500),
          int7 = setInterval(birdZLoop, 2000);
        intervals.push(int6, int7);
      };
      const level3 = () => {
        const int8 = setInterval(birdLoop, 500),
          int9 = setInterval(birdZLoop, 1500);
        intervals.push(int8, int9);
      };
      firstLoop();
      startTimer();
      raf = requestAnimationFrame(mainLoop);
      highScore();
    };

    const checkCollision = () => {
      const playArr = childrenArray[0],
        playX = playArr.position.x,
        playY = playArr.position.y,
        playW = playArr.size.w,
        playH = playArr.size.h;

      treesArray.forEach(item => {
        const obstX = item.position.x,
          obstY = item.position.y,
          obstW = item.size.w,
          obstH = item.size.h;

        if (
          (playX + playW * treeCorr >= obstX &&
            playX + playW <= obstX + obstW &&
            playY + playH * treeCorr >= obstY &&
            playY + playH <= obstY + obstH) ||
          (playX + playW * treeCorr >= obstX &&
            playX <= obstX + obstW * treeCorr &&
            playY + playH * treeCorr >= obstY &&
            playY + playH <= obstY + obstH * treeCorr) ||
          (playX + playW >= obstX &&
            playX <= obstX + obstW &&
            playY <= obstY + obstH &&
            playY >= obstY)
        ) {
          return gameOver();
        }
        return false;
      });
      birdsArray.forEach(item => {
        const obstX = item.position.x,
          obstY = item.position.y,
          obstW = item.size.w,
          obstH = item.size.h;
        if (
          (playX + playW * birdCorr >= obstX &&
            playX + playW * birdCorr <= obstX + obstW * birdCorr &&
            playY + playH * birdCorr >= obstY &&
            playY + playH * birdCorr <= obstY + obstH * birdCorr) ||
          (playX + playW * birdCorr >= obstX &&
            playX <= obstX + obstW &&
            playY + playH * birdCorr >= obstY &&
            playY + playH * birdCorr <= obstY + obstH * birdCorr) ||
          (playX + playW * birdCorr >= obstX &&
            playX <= obstX + obstW * birdCorr &&
            playY <= obstY + obstH * birdCorr &&
            playY >= obstY)
        ) {
          return gameOver();
        }
        return false;
      });
    };

    const clearAllIntervals = () => {
      intervals.forEach(i => {
        clearInterval(i);
      });
    };

    const clearAllTimeouts = () => {
      timeouts.forEach(i => {
        clearTimeout(i);
      });
    };

    const popGameOver = () => {
      const gameOverModal = document.getElementById("modalGameover");
      const closeModal = document.getElementById("btn__game--close");
      // const modalRecord = document.getElementById("highscore");
      const modalScore = document.getElementById("playerScore");
      const clearScoresBtn = document.getElementById("clearScores");
      const displayScoresBtn = document.getElementById("displayScores");
      const getLastScore = () => localStorage.getItem("lastScore");
      const checkScoreArr = () => JSON.parse(localStorage.getItem("gameScores"));
      
      const showTopTenBtn = () => {
        const arr = checkScoreArr();
        if (arr[0] == null) {
          displayElements(displayScoresBtn, false);
        }else{
          displayElements(displayScoresBtn, true, "inline");
        }
      };

      const closePopGameOver = event => {
        event.preventDefault();
        displayElements(gameOverModal, false);
        refreshBoard();
        clearTimeout(pop);
      };
      displayElements(gameOverModal, true, "flex");
      showTopTenBtn();
      displayElements(clearScoresBtn, false);
      // modalRecord.innerText = `Najlepszy wynik: ${getHighScore()}`;
      modalScore.innerText = `Twój wynik: ${getLastScore()}`;
      closeModal.addEventListener("click", closePopGameOver);
    };

    const gameOver = () => {
      cancelAnimationFrame(raf);
      clearAllIntervals();
      clearAllTimeouts();
      pop = setTimeout(popGameOver, 300);
    };

    class Render {
      static create(el, parent = board) {
        const parentVar = parent;
        const child = document.createElement("div");

        el.id = id++;
        child.setAttribute("id", `${el.name}${el.id}`);
        child.style.left = el.position.x + "px";
        child.style.top = el.position.y + "px";

        if (el.name === "player") {
          child.style.width = el.size.w + "px";
          child.style.height = el.size.h + "px";
          child.style.backgroundImage = "url('img/player_plane.png')";
          child.style.backgroundRepeat = "round";
          child.setAttribute("class", `player`);
        } else if (el.name === "obstacle") {
          child.style.width = el.size.w + "px";
          child.style.height = el.size.h + "px";
          child.style.backgroundImage = "url('img/tree3.png')";
          child.style.backgroundRepeat = "round";
          child.setAttribute("class", `obstacle ${el.name}`);
          treesArray.push(el);
        } else if (el.name === "bird") {
          child.style.width = el.size.w + "px";
          child.style.height = el.size.h + "px";
          child.style.backgroundImage = "url('img/bird_gull.png')";
          child.style.backgroundRepeat = "round";
          child.setAttribute("class", `bird ${el.name}`);
          birdsArray.push(el);
        } else if (el.name === "birdz") {
          child.style.width = el.size.w + "px";
          child.style.height = el.size.h + "px";
          child.style.backgroundImage = "url('img/bird_eagle.png')";
          child.style.backgroundRepeat = "round";
          child.setAttribute("class", `birdz ${el.name}`);
          birdsArray.push(el);
        } else {
          throw Error("unresolved object name in render create, line 90");
        }

        parentVar.appendChild(child);
        el.domEl = document.getElementById(`${el.name}${el.id}`);
        childrenArray.push(el);
      }

      static changePosition() {
        childrenArray.forEach(el => {
          let x = el.position.x;
          let y = el.position.y;

          if (el.name === "player") {
            el.domEl.style.left = x + "px";
            el.domEl.style.top = y + "px";
          } else if (el.name === "obstacle" || el.name === "bird") {
            el.moveObst();
            el.domEl.style.left = x + "px";
          } else if (el.name === "birdz") {
            el.moveBirdZ();
            el.domEl.style.left = x + "px";
            el.domEl.style.top = y + "px";
          }
        });
      }

      static KeySupport(domEl, event) {
        childrenArray.forEach(el => {
          if (el.type === "player") {
            switch (event.code) {
              case "ArrowLeft":
                if (el.position.x > boardStart) {
                  el.playerLeft();
                }
                break;
              case "ArrowRight":
                if (el.position.x + playerWidth < boardWidth) {
                  el.playerRight();
                }
                break;
              case "ArrowUp":
                if (el.position.y > boardStart) {
                  el.playerUp();
                }
                break;
              case "ArrowDown":
                if (el.position.y + playerHeight < boardHeight) {
                  el.playerDown();
                }
                break;
              default:
                return;
            }
          }
        });
      }

      static destroy(el) {
        el.domEl.style.transition = "opacity .1s ease-out";
        el.domEl.style.opacity = "0";
        el.domEl.remove();
        el.position.x = 1000;
        el.position.y = -1000;
        return (el = 0);
      }
    }

    class BoardElement {
      constructor(
        name,
        domEl,
        id,
        position = { x: "", y: "" },
        size = { w: "", h: "" },
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

    class Player extends BoardElement {
      constructor(
        name,
        domEl,
        id,
        position = { x: "", y: "" },
        size = { w: "", h: "" },
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

    class Obstacle extends BoardElement {
      constructor(
        name,
        domEl,
        id,
        position = { x: "", y: "" },
        size = { w: "", h: "" },
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

    const createPlayer = () => {
      return new Player(
        "player",
        "",
        id,
        { x: startLine, y: startLine },
        { w: playerWidth, h: playerHeight },
        speed,
        "player"
      );
    };
    const createObstacle = () => {
      return new Obstacle(
        "obstacle",
        "",
        "",
        { x: creationLine, y: boardHeight - obstHeight },
        { w: obstWidth, h: obstHeight },
        speedObst,
        "obstacle"
      );
    };
    const createBird = () => {
      return new Obstacle(
        "bird",
        "",
        "",
        { x: creationLine, y: generateBirdY() },
        { w: birdWidth, h: birdHeight },
        speedBird,
        "obstacle"
      );
    };
    const createBirdZ = () => {
      return new Obstacle(
        "birdz",
        "",
        "",
        { x: creationLine, y: generateBirdY() },
        { w: birdWidth, h: birdHeight },
        speedBirdZ,
        "obstacle"
      );
    };

    const generateBirdY = () => {
      const randPositions = [250, 300, 350, 400, 450, 480, 550, 600];
      const getPosition = Math.round(Math.random() * randPositions.length - 1); //generate random arr index
      const result = randPositions[getPosition] - 250;
      if (result !== undefined) {
        return result;
      } else {
        return randPositions[0];
      }
    };
    startGame();
  };
  boardButtons[1].addEventListener("click", game);
  boardButtons[0].addEventListener("click", backToMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
      game();
    } else if (event.code === 'Escape'){
    document.location.assign("../index.html");
      
      // backToMenu()
      // window.removeEventListener("keydown", backToMenu)
    }
  });

  const gameIndex = () => {
  boardButtons[1].addEventListener("click", game);
  boardButtons[0].addEventListener("click", backToMenu);
  };

  instruction();
  scoreboard();
  gameIndex();

})));
