const mailStorage = () => {
    const
        inputMail = document.querySelector("#form__input"),
        checkbox = document.querySelector('input[type="checkbox"]'),
        btn = document.querySelector('button'),
        submitMail = document.querySelector("#form__submit"),
        thankYou = document.querySelector("#thankYou"),

        validateMail = () => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(inputMail.value).toLowerCase());

        },
        addMail = () => {
            if (validateMail()) {
                localStorage.setItem("email", inputMail.value);
                thankYou.classList.add('form__red--no');
                thankYou.innerText = 'Dziękujemy! Zapewniamy o bezpieczeństwie Państwa danych.';
                // popGame()
            } else {
                thankYou.classList.add('form__red');
                thankYou.innerText = 'Prosimy o podanie adresu e-mail.';
            }

        },

        givePerm = () => {
            event.preventDefault();
            if (checkbox.checked) {
                addMail();
            } else {
                thankYou.classList.add('form__red');
                thankYou.innerText = 'Prosimy o wyrażenie zgody na przetwarzanie danych osobowych.';
            }
        };

    submitMail.addEventListener("click", givePerm);
};

export default mailStorage