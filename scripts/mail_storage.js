const
    inputMail = document.querySelector("#form__input"),
    checkbox = document.querySelector('input[type="checkbox"]'),
    btn = document.querySelector('button'),
    submitMail = document.querySelector("#form__submit"),
    thankYou = document.querySelector("#thankYou");

function addMail(){
    if(validateMail() === true) {
        localStorage.setItem("email", inputMail.value);
        thankYou.classList.add('form__red--no');
        thankYou.innerText = 'Dziękujemy! Zapewniamy o bezpieczeństwie Państwa danych.';
        // setTimeout(document.location.assign('./game/game.html'), 200);
        document.location.assign('./game/game.html')
    } else {
        thankYou.classList.add('form__red');
        thankYou.innerText = 'Prosimy o podanie adresu e-mail.';
    };
};
function givePerm(){
    event.preventDefault();
    if (checkbox.checked === true){
        addMail();
    } else {
        thankYou.classList.add('form__red');
        thankYou.innerText = 'Prosimy o wyrażenie zgody na przetwarzanie danych osobowych.';
    };
};

function validateMail(){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(inputMail.value).toLowerCase()) === true){
    return true;
    } else {
        return false;
    };
};

submitMail.addEventListener("click", givePerm);