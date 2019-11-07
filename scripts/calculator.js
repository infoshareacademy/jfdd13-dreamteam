// UWAGI AS: opakować w funkcję zamowykonującą się
// UWAGI AS: po co tyle enterów w kodzie?


const sliderPeople = document.getElementById("myRange"),
    sliderDays = document.getElementById("myRange1"),
    outputPeople = document.getElementById("demo"),
    outputDays = document.getElementById("demo1");


function sliderWorking() {


    outputPeople.innerHTML = sliderPeople.value;
    outputDays.innerHTML = sliderDays.value;

    sliderPeople.oninput = function () {
        outputPeople.innerHTML = this.value;
    }


    sliderDays.oninput = function () {

        outputDays.innerHTML = this.value;

    }

}

sliderWorking();


let price = 300;

function checkPrice() {

    let discount = 0;
    let checkbox = document.getElementById("checkbox_dog");

    if (sliderPeople.value > 2 && sliderPeople.value < 7) {
        discount = 5
    } else if (sliderPeople.value >= 7) {
        discount = 10
    }

    if (sliderDays.value > 7) {
        discount += 5;
    }

    price = price * (1 - discount / 100);

    if (checkbox.checked) {
        price = price + 5;     // UWAGI AS: W zadaniu jest 5zł za kazdy dzień z psem ;) czyli trzeba jesze ta 5tke wymnozyc z dniami
    }

    return price;

}

function displayPrice() {

    price = 300;
    // showPrice = document.querySelector('.price');
    // showPrice.innerText = ` ${checkPrice()} zł`;
    const showParagraph = document.querySelector('.price_comment');
    showParagraph.innerHTML = `Cena bazowa wynosi 300 zł, a cena dla Ciebie to <span class="price">${checkPrice()} zł</span>.`

}


const buttonPrice = document.getElementsByClassName("btn_calculator")[0];
buttonPrice.addEventListener('click', displayPrice);