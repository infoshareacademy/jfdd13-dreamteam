// 1. Klawisz <- (stzałka w lewo) przesuwa w lewo (cofa) slider
// 2. Klawisz -> (stzałka w lewo) przesuwa w prawo slider (do przod, czyli tak jak przy funkcji changeSlide) 
// 3. (strzałki) wstrzymuje setInterval, a po zmianie slajdu uruchamiają go ponownie (czas ma się liczyć ponownie)


// const slideList = [{
//   img: "londek.jpg",
 
//  },
//  {
//   img: "bahama.jpg",
 
//  },
//  {
//   img: "zima.jpg",
 
//  }];
 
//  const image = document.querySelector('img.slider');
//  const h4 = document.querySelector('h1.slider');
//  const dots = [...document.querySelectorAll('.dots span')]
//  // Interfejs
//  const time = 3000;
//  let active = 0;
 
//  // Implementacje
 
//  const changeDot = () => {
//   const activeDot = dots.findIndex(dot => dot.classList.contains('active'));
//   dots[activeDot].classList.remove('active');
//   dots[active].classList.add('active');
//  }
 
//  const changeSlide = () => {
//   active++;
//   if (active === slideList.length) {
//    active = 0;
//   }
//   image.src = slideList[active].img;
//   h1.textContent = slideList[active].text;
//   changeDot()
//  }
//  let indexInterval = setInterval(changeSlide, time)
 
//  // Klawisze
//  const keyChangeSlide = (e) => {
//   console.log(e.keyCode);
//   if (e.keyCode == 37 || e.keyCode == 39) {
//    clearInterval(indexInterval)
//    e.keyCode == 37 ? active-- : active++;
//    if (active === slideList.length) {
//     active = 0;
//    } else if (active < 0) {
//     active = slideList.length - 1;
//    }
//    image.src = slideList[active].img;
//    h1.textContent = slideList[active].text;
//    changeDot();
//    indexInterval = setInterval(changeSlide, time)
//   }
//  }
 
//  window.addEventListener('keydown', keyChangeSlide)
 