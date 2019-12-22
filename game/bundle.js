(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  const instruction = () => {
    const modal = document.getElementById("instBoxM");

  const btn = document.getElementById("inst__btn");

  const span = document.getElementsByClassName("modal__close")[0];
  const closeBtn = document.getElementById("close__btn");

  btn.onclick = function() {
    modal.style.display = "flex";
  };

  span.onclick = function() {
    modal.style.display = "none";
  };

  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  };

  instruction();

})));
