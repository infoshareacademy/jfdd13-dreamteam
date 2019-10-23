const
    inputMail = document.querySelector("#form__input"),
    checkbox = document.querySelector('input[type="checkbox"]'),
    btn = document.querySelector('button'),
    submitMail = document.querySelector("#form__submit"),
    thankYou = document.querySelector("#thankYou");

function addMail(){
    if(inputMail.value.length !== 0) {
        localStorage.setItem("email", inputMail.value);
        thankYou.classList.add('form__red--no');
        thankYou.innerText = 'Dziękujemy! Zapewniamy o bezpieczeństwie Państwa danych.';
    } else {
        thankYou.classList.add('form__red');
        thankYou.innerText = 'Prosimy o podanie adresu e-mail.';
    }     
}
function givePerm(){
    event.preventDefault();
    if (checkbox.checked === true){
        addMail();
    } else {
        thankYou.classList.add('form__red');
        thankYou.innerText = 'Prosimy o wyrażenie zgody na przetwarzanie danych osobowych.';
    }
}

submitMail.addEventListener("click", givePerm);