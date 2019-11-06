const slideList = [
  {
    img: "img/londek.jpg",
    text: "Ruszaj w drogę"
  },
  {
    img: "img/zima.jpg",
    text: "Ruszaj na co czekasz"
  },
  {
    img: "img/bahama.jpg",
    text: "Dlaczego nie ruszyłeś?"
  }];

const image = document.querySelector('img.sliderHero');
const h1 = document.querySelector('h1.heading__h1');
const dots = [...document.querySelectorAll('.dots span')];

const time = 3000;
let active = 0;
const changeDots = () => {
  const activeDot = dots.findIndex(dot => dot.classList.contains('active'));
  dots[activeDot].classList.remove('active');
  dots[active].classList.add('active');
}



const changeSlide = () => {
  active++;
  if(active === slideList.length){
    active = 0;
  } 
  image.src = slideList[active].img;
  h1.textContent = slideList[active].text;
  changeDots()
}

setInterval(changeSlide, time);
// setInterval(changeDots, time);


