const
    inputMail = document.querySelector("#form__input"),
    checkbox = document.querySelector('input[type=checkbox]'),
    btn = document.querySelector('button'),
    submitMail = document.querySelector("#form__submit"),
    thankYou = document.querySelector("#thankYou"),
    isCheck = document.querySelector("#check__input");
    
function addMail(){
    localStorage.setItem("email", inputMail.value);
    thankYou.innerText = 'Dziękujemy! Zapewniamy o bezpieczeństwie Państwa danych.';
      
}
function validMail(){
    event.preventDefault();
    if (isCheck.checked == true){
        thankYou.classList.add('form__red--no');
        addMail();
    }else{
        thankYou.classList.add('form__red');
        thankYou.innerText = 'Prosimy o wyrażenie zgody na przetwarzanie danych osobowych.';
    }
}

submitMail.addEventListener("click", validMail);

//nav animation onscroll

window.addEventListener('scroll', function(e) {
    console.log(window.scrollY);
    if (window.scrollY > 140) {
        document.querySelector('nav').classList.add('scrolled');
        // document.querySelector('.show_menu').classList.add('scrolled');
    } else{
        document.querySelector('nav').classList.remove('scrolled');
    }
});