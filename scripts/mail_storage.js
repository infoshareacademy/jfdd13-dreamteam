const inputMail = document.querySelector("#input__form")

function addMail(){
    localStorage.setItem("email", inputMail.value);
    // console.log(localStorage.getItem('email'));
}

inputMail.addEventListener("input", addMail);
