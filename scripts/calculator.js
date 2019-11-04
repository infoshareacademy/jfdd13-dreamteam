
    const sliderPeople = document.getElementById("myRange");
    const sliderDays = document.getElementById("myRange1");
    const outputPeople = document.getElementById("demo");
    const outputDays = document.getElementById("demo1");


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

    if (sliderPeople.value > 2 && sliderPeople.value < 7 && checkbox.checked === false) {
        discount = 5
    } else if (sliderPeople.value >= 7 && checkbox.checked === false) {
        discount = 10
    }

    if (sliderDays.value > 7 && checkbox.checked === false) {
        discount += 5;
    }

    price = price * (1 - discount / 100);

    if (checkbox.checked) {
        price = price + 5;
    }

    return price;

}

function displayPrice() {
    
    price = 300;
    discount = 0;
    showPrice = document.querySelector('.price');
    showPrice.innerText = ` ${checkPrice()} zł`;

}


const buttonPrice = document.getElementById("button_calculator");
buttonPrice.addEventListener('click', displayPrice);