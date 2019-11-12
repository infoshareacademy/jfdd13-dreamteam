const hero__slider = () => {
  const slideList = [
    {
      img: "../img/bg-1366x768.png",
      text: "Ruszaj w drogę",
      text2: "Zaplanuj swoją podróż szybciej niż kiedykolwiek wcześniej!"
    },
    {
      img: "../img/bg1.jpg",
      text: "Podróżuj więcej. Płać mniej.",
      text2: "Bądź pewien, że wybrałeś najkorzystniejszą dla siebie ofertę."
    },
    {
      img: "../img/bg2.jpg",
      text: "Odkryj świat z way.to",
      text2: "Portal stworzony przez miłośników podróżowania, chcących zarażać swoją pasją"
    }];

  const image = document.querySelector('.hero');
  const h1 = document.getElementById('slider__heading');
  const h1span = document.getElementById('slider__text');
  const arrowPrev = document.getElementById('slider--prev');
  const arrowNext = document.getElementById('slider--next');
  const time = 5000;


  let active = 0;



  const changeSlide = () => {
    active++;
    if(active === slideList.length){
      active = 0;
    }
    const nextImg = slideList[active].img;
    image.style.backgroundImage = `url("${nextImg}")`;
    image.style.backgroundSize = "cover";
    h1.textContent = slideList[active].text;
    h1span.textContent = slideList[active].text2;
  };

  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  const plusSlides = () => {
    if (prev){
      changeSlide();
    }
  };

  const slides =  setInterval(changeSlide, time);
  arrowPrev.addEventListener('click', () => {
    plusSlides(-1);
    clearInterval(slides)
  });
  arrowNext.addEventListener('click', () => {
    plusSlides(1);
    clearInterval(slides)
  });
  changeSlide();
};

export default hero__slider