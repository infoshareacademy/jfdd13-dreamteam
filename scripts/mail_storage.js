const mailStorage = () => {
    const
        inputMail = document.querySelector("#form__input"),
        checkbox = document.querySelector('input[type="checkbox"]'),
        btn = document.querySelector('button'),
        submitMail = document.querySelector("#form__submit"),
        thankYou = document.querySelector("#thankYou"),
        popGame = () => {
            console.log('popGame init log')
            //hide wrapper overflow on modal pop
            const wrapper = document.querySelector('.wrapper');
            wrapper.style.overflow = 'hidden';


            const modal = document.createElement('div')
            const modalHeight = 300;
            const modalWidth = 400;
            modal.style.top = this.scrollY + window.pageYOffset / 2 - modalHeight + 'px';
            modal.style.left = document.querySelector('.wrapper').offsetWidth / 2 - modalWitdh + 'px'


        },
        popGameModal = () => {
            const btnGame = document.getElementById('#gamebtn__game--redirect');
            const gameModal = document.getElementById('modal__game');
            gameModal.style.display = 'flex';

            btnGame.addEventListener('click', popGame)
        },
        validateMail = () => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(inputMail.value).toLowerCase());
        },
        addMail = () => {
            if (validateMail()) {
                localStorage.setItem("email", inputMail.value);
                thankYou.classList.add('form__red--no');
                thankYou.innerText = 'Dziękujemy! Zapewniamy o bezpieczeństwie Państwa danych.';
                popGameModal()
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