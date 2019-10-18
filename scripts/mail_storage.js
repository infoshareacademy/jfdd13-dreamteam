const
    inputMail = document.querySelector("#input__form"),
    submitMail = document.querySelector("#form__submit"),
    thankYou = document.querySelector("#thankYou");
    
function addMail(){
    localStorage.setItem("email", inputMail.value);
    thankYou.innerText = 'Dziękujemy! Zapewniamy o bezpieczeństwie Państwa danych.';
    event.preventDefault();
}

submitMail.addEventListener("click", addMail);

