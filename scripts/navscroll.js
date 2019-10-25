const nav = document.querySelector('.nav');
const navMobile = document.querySelector('.nav__mobile');
const navList__container = document.querySelector('.list__container');
const navLinkArr = document.querySelectorAll('.nav__link');
//nav animation onscroll

window.addEventListener('scroll', function(e) {
    if (window.scrollY > 80) {
        nav.classList.add('scrolled');
    } else{
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

const hero = document.querySelector('.hero');
const functions = document.querySelector('.functions');
const form = document.querySelector('.form');
const footer = document.querySelector('.footer');

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY + window.innerHeight;
    const isActive = 'active';
    if (scrollY < hero.offsetTop) {
        navLinkArr[0].classList.toggle(isActive);
    }
    if (scrollY > hero.offsetTop && scrollY < functions.offsetTop){
        navLinkArr[1].classList.toggle(isActive);
    }
    if (scrollY > functions.offsetTop && scrollY < form.offsetTop){
        // navLinkArr[2].classList.remove(isActive);
        navLinkArr[2].classList.toggle(isActive);
        // navLinkArr[2].classList.add(isActive);
    }
    if (scrollY > form.offsetTop && scrollY < footer.offsetTop){
        navLinkArr[3].classList.toggle(isActive);
    }
});