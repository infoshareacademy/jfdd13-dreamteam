const
    inputMail = document.querySelector("#input__form"),
    submitMail = document.querySelector("#form__submit");

function addMail(){
    localStorage.setItem("email", inputMail.value);
    event.preventDefault();
}

submitMail.addEventListener("click", addMail);

