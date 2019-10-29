const nav = document.querySelector('.nav');
const navMobile = document.querySelector('.nav__mobile');
const navList__container = document.querySelector('.list__container');
const navLinkArr = document.querySelectorAll('.nav__link');
//nav animation onscroll
function navAnimation() {

    window.addEventListener('scroll', function (e) {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    //add hover class to rwd menu
    navMobile.addEventListener('mouseover', () => {

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


function navFocus() { //underline nav item on focus

    window.addEventListener('scroll', () => {

        let scrollY = window.scrollY;
        const isActive = 'active'

        navLinkArr.forEach((element) => {

            element.classList.remove(isActive);

            if (scrollY >= 20 && scrollY < hero.offsetHeight / 2) {
                navLinkArr[0].classList.add(isActive);
            } else if (scrollY > hero.offsetHeight / 2 && scrollY < hero.offsetHeight + functions.offsetHeight / 2) {
                navLinkArr[1].classList.add(isActive);
            } else if (scrollY > hero.offsetHeight + functions.offsetHeight / 2 && scrollY < hero.offsetHeight + functions.offsetHeight + form.offsetHeight / 2) {
                navLinkArr[2].classList.add(isActive);
            } else if (scrollY > hero.offsetHeight + functions.offsetHeight + form.offsetHeight / 2) {
                navLinkArr[3].classList.add(isActive);
            }
        })
    });

}





navAnimation();
navFocus();
