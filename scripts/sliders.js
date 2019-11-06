const slideList = [
  {
    img: "../img/bg-1366x768.png",
    text: "Ruszaj w drogę"
  },
  {
    img: "../img/bg1.jpg",
    text: "Ruszaj, na co czekasz"
  },
  {
    img: "../img/bg2.jpg",
    text: "Teksty z pupy"
  }];

const image = document.querySelector('.hero');
const h1 = document.querySelector('h1.heading__h1');
const dots = [...document.querySelectorAll('.dots span')];

const time = 4000;
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
  const nextImg = slideList[active].img;
  image.style.background = `url("${nextImg}") no-repeat center`
  image.style.backgroundSize = "cover";
  h1.textContent = slideList[active].text;
  
  changeDots()
  }

setInterval(changeSlide, time);
// setInterval(changeDots, time);


