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


//adding sections variables to nav__item highlight function
const wrapper = document.querySelector('.wrapper');
const hero = document.querySelector('.hero');
const functions = document.querySelector('.functions');
const form = document.querySelector('.form');
const footer = document.querySelector('.footer');