export const instruction = () => {
  const modal = document.getElementById("modalInstruction");

const btn = document.getElementById("btnInstructionShow");

const span = document.getElementById("iconInstructionClose");
const closeBtn = document.getElementById("btnInstructionClose");

function hideModal() {
  modal.style.display = "none"
}

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
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
};