class Player {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    // AS UWAGI: przydałaby sie wysokosc i szerokosc (kolizje)
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }

  left() {
    this._x -= 1; // AS UWAGI: wyciagnąłbym do jakiejs konfiguracji
  }
  right() {
    this._x += 2; // AS UWAGI: wyciagnąłbym do jakiejs konfiguracji
  }
  up() {
    this._y -= 5; // AS UWAGI: wyciagnąłbym do jakiejs konfiguracji
  }
  down() {
    this._y += 5; // AS UWAGI: wyciagnąłbym do jakiejs konfiguracji
  }
}
const PlaneJS = new Player(100, 200); // AS UWAGI: to plane czy player?

class Move {
  static RenderPlane(PlaneJS) {
    const PlaneDom = document.getElementById('player'); // AS UWAGI: plane czy player?
    PlaneDom.style.left = PlaneJS.x + "px";
    PlaneDom.style.top = PlaneJS.y + "px";
  }

  static KeySupport(PlaneJS, event) {
    switch (event.code) {
      case "ArrowLeft":
        PlaneJS.left();
        Move.RenderPlane(PlaneJS); // AS UWAGI: kod sie potwarza, wiec moze warto wyciagnac poza switcha?
        break;
      case "ArrowRight":
        PlaneJS.right();
        Move.RenderPlane(PlaneJS);
        break;
      case "ArrowUp":
        PlaneJS.up();
        Move.RenderPlane(PlaneJS);
        break;
      case "ArrowDown":
        PlaneJS.down();
        Move.RenderPlane(PlaneJS);
        break;
      default:
        return;
    }
  }

  static Collision(PlaneJS) {
    if ( // AS UWAGI: sugeruje wyciagnac wartosci brzegowe do zmiennych konfiguracyjnych gdzies na poczatku pliku albo jeszcze lepiej, odczytywac je dynamicznie z kontenera w ktorym jest samolot
      PlaneJS.x === 20 || PlaneJS.x < 20 || PlaneJS.x === 880 || PlaneJS.x > 880 || 
      PlaneJS.y === 10 || PlaneJS.y < 10 || PlaneJS.y === 500 || PlaneJS.y > 500
    ) {
      document.querySelector(".board").style.background = "crimson";
      setTimeout(eyeBlink, 150);
      function eyeBlink() {
        location.reload();
        alert("GAME OVER! Sorry, this is the end of your trip.");
      }
    }
  }
}

Move.RenderPlane(PlaneJS);
document.addEventListener("keydown", event => Move.Collision(PlaneJS, event));

const 
  startBtn = document.getElementById('start__btn'),
  startGame = () => {
    startBtn.style.display = 'none';
    event.preventDefault();
    // CreateObstacles.CreateObst();

    setInterval(() => RenderObstacles.RenderObst(ObstacleArray, '.board'),100);
    document.addEventListener("keydown", event => Move.KeySupport(PlaneJS, event));
};

class Obstacle {
  constructor(name, x, y) {
    this._name = name;
    this._x = x;
    this._y = y;
  }
  get name() {
    return this._name;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  set name(newName) {
    this._name = newName;
  }
  set x(newX) {
    this._x = newX;
  }
  set y(newY) {
    this._y = newY;
  }
  leftBird() {
    this._x -= 10; // AS UWAGI: zmienne konfiguracyjne
  }
  downBird() {
    this._y -= -1;
  }
  leftSky() {
    this._x -= 1;
  }
  leftObst() {
    this._x -= 3;
  }
}
const ObstacleArray = [
  new Obstacle('img', 640, 120),
  new Obstacle('bird1', 340, 60),
  new Obstacle('bird2', 840, 70),
  new Obstacle('cloud1', 80, 20),
  new Obstacle('cloud2', 480, 80),
  new Obstacle('cloud3', 540, 30), 
  new Obstacle('mount', -80, 300),
  new Obstacle('tree1', 10, 460),
  new Obstacle('tree2', 55, 475),
  new Obstacle('tree3', 110, 420),
  new Obstacle('tree4', 190, 460),
  new Obstacle('city1', 370, 390),
  new Obstacle('city2', 640, 390),
  new Obstacle('city3', 760, 390)
];
// class CreateObstacles {
//   static CreateObst() {
//     const placeToAdd = document.querySelector('.board');
//     placeToAdd.innerHTML = '';
//     ObstacleArray.forEach((name,x) => {
//       const newObst = document.createElement('div');
//       newObst.innerHTML = '';

      
//       placeToAdd.appendChild(newObst);
//     })
//     }
//   }

class RenderObstacles {
  static RenderObst() {
    
  }
}

startBtn.addEventListener('click', startGame);


// AS UWAGI: moim zdaniem powinien byc jeden głowny renderer do wszystkich elementow na stronie, albo przynajmniej jeden głowny który by delegował prace do innych mniejszysz rendererow odpowiedzialnych za inne elementy
// AS UWAGI: dodatkowo chyba powinien on dzialac na jakims intervale i aktualizowac pozycje wszystkiego i weryfikowac kolizje
// AS UWAGI: poza tym całą gre moglibyscie zamknac w jednej klasie i wywołac tylko "new Game() ktora inicjowała by wszystko :D"
// AS UWAGI: aa i jeszcze jedno... wykonania głowne kodu raczej piszcie na samym dole, a najlepiej w klasach/funkcjach, a nie luzno w kodzie bo teraz trzeba szukac co gdzie jest.