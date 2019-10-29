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


function sliderWorking() {
    let sliderPeople = document.getElementById("myRange");
    let sliderDays = document.getElementById("myRange1");
    let outputPeople = document.getElementById("demo");
    let outputDays = document.getElementById("demo1");
    outputPeople.innerHTML = sliderPeople.value;
    outputDays.innerHTML = sliderDays.value;

    sliderPeople.oninput = function () {
        outputPeople.innerHTML = this.value;
    }


    sliderDays.oninput = function () {

        outputDays.innerHTML = this.value;

    }

} 

let buttonPrice = document.getElementById("button_calculator");

function checkPrice(){
    let price = 5000;
    let discount = 0;
    let checkbox = document.getElementById("checkbox_dog");
    

    if (sliderPeople.value >2  && sliderPeople.value < 7) {
        discount = 5
    } else if (sliderPeople.value >= 7 ) {
        discount = 10
    }

    if (sliderDays.value > 7) {
        discount += 5;
    }

    price = price * 1 - (discount/100);

    if (checkbox.checked) {
        price = price + 5;
    }  
    
}

buttonPrice.addEventListener('click', checkPrice());


navAnimation();
navFocus();
sliderWorking();