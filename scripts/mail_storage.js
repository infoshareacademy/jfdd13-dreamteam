// UWAGI AS: opakować w funkcję zamowykonującą się

const
    inputMail = document.querySelector("#form__input"),
    checkbox = document.querySelector('input[type="checkbox"]'),
    btn = document.querySelector('button'),
    submitMail = document.querySelector("#form__submit"),
    thankYou = document.querySelector("#thankYou");

function addMail(){
    if(validateMail() === true) { // UWAGI AS: wystarczy forma: if (validateMail()) {}  przecie wiadomo ze true to true ;)
        localStorage.setItem("email", inputMail.value);
        thankYou.classList.add('form__red--no');
        thankYou.innerText = 'Dziękujemy! Zapewniamy o bezpieczeństwie Państwa danych.';
    } else {
        thankYou.classList.add('form__red');
        thankYou.innerText = 'Prosimy o podanie adresu e-mail.';
    };
};
function givePerm(){
    event.preventDefault();
    if (checkbox.checked === true){// UWAGI AS: jak wyzej, true, to true
        addMail();
    } else {
        thankYou.classList.add('form__red');
        thankYou.innerText = 'Prosimy o wyrażenie zgody na przetwarzanie danych osobowych.';
    };
};

function validateMail(){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // UWAGI AS: true to true zamiast ifologi wystarczy wam zapis:
    // UWAGI AS: return re.test(String(inputMail.value).toLowerCase());
    if (re.test(String(inputMail.value).toLowerCase()) === true){ 
    return true; // UWAGI AS: tabulacja
    } else {
        return false;
    };
};

submitMail.addEventListener("click", givePerm);