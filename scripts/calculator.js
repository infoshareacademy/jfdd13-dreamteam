const sliderPeople = document.getElementById("myRange");
const sliderDays = document.getElementById("myRange1");
const outputPeople = document.getElementById("demo");
const outputDays = document.getElementById("demo1");
outputPeople.innerHTML = sliderPeople.value;
outputDays.innerHTML = sliderDays.value;


function sliderWorking() {


    sliderPeople.oninput = function () {
        outputPeople.innerHTML = this.value;
    }


    sliderDays.oninput = function () {

        outputDays.innerHTML = this.value;

    }

} 

const buttonPrice = document.getElementById("button_calculator");
const price = 300;

function checkPrice() {
    let price = 300;
    let discount = 0;
    let checkbox = document.getElementById("checkbox_dog");
    
    if (sliderPeople.value >2  && sliderPeople.value < 7) {
        discount = 5
    } else if (sliderPeople.value >= 7 ) {
        discount = 10
    }

    if (sliderDays.value > 7) {
        discount += 5;
    }

    price = price * (1 - discount/100);

    if (checkbox.checked) {
        price = price + 5;
    }  

    return price;

}



function displayPrice(){

showPrice = document.querySelector('.price');
showPrice.innerText = ` ${price} zł`

}


buttonPrice.addEventListener('click', displayPrice());

sliderWorking();