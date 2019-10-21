const
    inputMail = document.querySelector("#form__input"),
    submitMail = document.querySelector("#form__submit"),
    thankYou = document.querySelector("#thankYou");
    
function addMail(){
    localStorage.setItem("email", inputMail.value);
    thankYou.innerText = 'Dziękujemy! Zapewniamy o bezpieczeństwie Państwa danych.';
    event.preventDefault();
}

submitMail.addEventListener("click", addMail);

//nav animation onscroll

window.addEventListener('scroll', function(e) {
    console.log(window.scrollY);
    if (window.scrollY > 140) {
        document.querySelector('nav').classList.add('scrolled');
    } else{
        document.querySelector('nav').classList.remove('scrolled');
    }
});