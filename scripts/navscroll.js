// UWAGI AS: cały kod mozna zamknac w funkcji zamowykonujacej sie, ograniczymy dzieki temu ilosc zmiennych na window
const nav = document.querySelector('.nav');
const navMobile = document.querySelector('.nav__mobile');
const navList__container = document.querySelector('.list__container');
const navLinkArr = document.querySelectorAll('.nav__link');
//nav animation onscroll
const navAnimation = () => {

    window.addEventListener('scroll', function (e) {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    //add hover class to rwd menu
    navMobile.addEventListener('click', () => {

        navList__container.classList.add('list__container--hover');
        navLinkArr.forEach((element) => {
            element.addEventListener('click', () => {
                navList__container.classList.remove('list__container--hover');
            })
        })
    });
}


//adding sections variables to nav__item highlight function
const wrapper = document.querySelector('.wrapper');
const hero = document.querySelector('.hero');
const functions = document.querySelector('.functions');
const form = document.querySelector('.form');
const footer = document.querySelector('.footer');
const calculator_divs = document.querySelector('#calculator');

const navFocus = () => { //underline nav item on focus

    window.addEventListener('scroll', () => {

        let scrollY = window.scrollY;
        const isActive = 'active'

        navLinkArr.forEach((element) => {

            element.classList.remove(isActive);
            // UWAGI AS: hero.offsetHeight , functions.offsetHeight, calculator_divs.offsetHeight to zmiennej, poprawi to czytelnosc ifologi
            // UWAGI AS: czy aby na pewno ta ifologia musi latać w pętli?
            // UWAGI AS: moze da sie uproscic wnętrze ifów? np zapamietywać tylko index navLinkArr i i nadanie klasy dać juz za ifami?
            // UWAGI AS: np. let activeEl = 0;
            if (scrollY >= 20 && scrollY < hero.offsetHeight / 2) { 
                // UWAGI AS: np. activeEl = 0;
                navLinkArr[0].classList.add(isActive);
            } else if (scrollY > hero.offsetHeight / 2 && scrollY < hero.offsetHeight + functions.offsetHeight / 2) {
                navLinkArr[1].classList.add(isActive);
            } else if (scrollY > hero.offsetHeight + functions.offsetHeight / 2 && scrollY < hero.offsetHeight + functions.offsetHeight + form.offsetHeight / 2) {
                navLinkArr[2].classList.add(isActive);
            } else if (scrollY > hero.offsetHeight + functions.offsetHeight + form.offsetHeight / 2 && scrollY < hero.offsetHeight + functions.offsetHeight + form.offsetHeight + calculator_divs.offsetHeight / 2) {
                navLinkArr[3].classList.add(isActive);
            } else if (scrollY > hero.offsetHeight + functions.offsetHeight + form.offsetHeight + calculator_divs.offsetHeight / 2) {
                navLinkArr[4].classList.add(isActive);
            }
            // UWAGI AS: np. navLinkArr[activeEL].classList.add(isActive);
        })
    });

}


const calculator = () => {
    const slider = document.getElementById("myRange");
    const slider1 = document.getElementById("myRange1");
    const output = document.getElementById("demo");
    const output1 = document.getElementById("demo1");
    output.innerHTML = slider.value;
    output1.innerHTML = slider1.value;

    slider.oninput =  () => {output.innerHTML = this.value;};


    slider1.oninput = () => { output1.innerHTML = this.value;}
};

navAnimation();
navFocus();
calculator();