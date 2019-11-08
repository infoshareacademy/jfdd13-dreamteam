// function slider() {
    const slideList = [
        {
            img: "../img/bg0.jpg",
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
    const arrowNext = document.getElementById('hero__arrow--next');
    const arrowPrev = document.getElementById('hero__arrow--prev');
    const image = document.querySelector('.hero');
    const h1 = document.querySelector('h1.heading__h1');
    const h3 = document.querySelector('h3.heading__h3');

    let time = 5000;
    let active = 1;


    const changeSlide = (direction = 1) => {
        if (direction === 1) {
            active++
        } else {
            active--
        }
        if (active === -1) {active = 2}
        if (active === slideList.length || active <= 0) {
            active = 0;
        }
        const nextImg = slideList[active].img;
        image.style.transition = `background ease-in`;
        image.style.transitionDuration = '2s';
        image.style.backgroundImage = `url("${nextImg}")`;
        image.style.backgroundSize = "cover";
        h1.textContent = slideList[active].text;
        h3.textContent = slideList[active].text2;
        console.log(`active is ${active}`)
    };

    const plusSlides = () => {
        if (arrowPrev) {
            changeSlide();
            console.log('dupa1')

        } else {
            changeSlide(10)
        }
    };
    arrowPrev.addEventListener('click', () => {
        changeSlide(-1);
        clearInterval(change);
        console.log('click prev');
    });

    arrowNext.addEventListener('click', () => {
        changeSlide(1);
        clearInterval(change);
        console.log('click next');

    });
    const change = setInterval(changeSlide, time);

// }




