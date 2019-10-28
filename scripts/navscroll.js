const nav = document.querySelector('.nav');
const navMobile = document.querySelector('.nav__mobile');
const navList__container = document.querySelector('.list__container');
const navLinkArr = document.querySelectorAll('.nav__link');
//nav animation onscroll
function navAnimation() {

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
}


//adding sections variables to nav__item highlight function
const wrapper = document.querySelector('.wrapper');
const hero = document.querySelector('.hero');
const functions = document.querySelector('.functions');
const form = document.querySelector('.form');
const footer = document.querySelector('.footer');


function navFocus() { //underline nav item on focus

    window.addEventListener('scroll', () => {
        // let scrollY = window.scrollY + window.innerHeight;
        let scrollY = window.scrollY;
        const isActive = 'active';
        if (scrollY < hero.offsetTop) {
            navLinkArr[0].classList.toggle(isActive);
        }
        else if (scrollY > hero.offsetTop && scrollY < functions.offsetTop) {
            navLinkArr[1].classList.toggle(isActive);
        }
        else if (scrollY > functions.offsetTop && scrollY < form.offsetTop){
            navLinkArr[2].classList.toggle(isActive);
        }
        else if (scrollY >= (wrapper.offsetHeight - footer.offsetHeight)){
            navLinkArr[3].classList.toggle(isActive);
        }
    });

}

navAnimation();
navFocus();