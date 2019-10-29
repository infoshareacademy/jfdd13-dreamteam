function sliderWorking() {
    let sliderPeople = document.getElementById("myRange");
    let sliderDays = document.getElementById("myRange1");
    let outputPeople = document.getElementById("demo");
    let outputDays = document.getElementById("demo1");
    outputPeople.innerHTML = sliderPeople.value;
    outputDays.innerHTML = sliderDays.value;

    sliderPeople.oninput = function () {
        outputPeople.innerHTML = this.value;
    }


    sliderDays.oninput = function () {

        outputDays.innerHTML = this.value;

    }

} 

let buttonPrice = document.getElementById("button_calculator");

function checkPrice(){
    let price = 5000;
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

    price = price * 1 - (discount/100);

    if (checkbox.checked) {
        price = price + 5;
    }  
    
}

buttonPrice.addEventListener('click', checkPrice());
sliderWorking();