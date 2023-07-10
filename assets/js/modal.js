const modal = document.querySelector(".main-modal");
const modalE = document.querySelector(".main-modalE");
const closeButton = document.querySelectorAll(".modal-close");
const closeButtonE = document.querySelectorAll(".modal-closeE");
const formulario = document.querySelector("[data-form-productC]");

const modalClose = () => {
  modal.classList.remove("fadeIn");
  modal.classList.add("fadeOut");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
};
const modalCloseE = () => {
  modalE.classList.remove("fadeIn");
  modalE.classList.add("fadeOut");
  setTimeout(() => {
    modalE.style.display = "none";
  }, 500);
};

const openModal = () => {
  formulario.reset();
  document.getElementById("box__imagen").style.backgroundImage = "url('../../assets/img/no-img-photo.jpg')";
  document.querySelector("#labelarchivo").innerHTML = 'Selecciona una foto...'
  modal.classList.remove("fadeOut");
  modal.classList.add("fadeIn");
  modal.style.display = "flex";
};

for (let i = 0; i < closeButton.length; i++) {
  const elements = closeButton[i];

  elements.onclick = (e) => modalClose();

  modal.style.display = "none";
  // modalE.style.display = 'none';

  // window.onclick = function (event) {
  // 	if (event.target == modal) modalClose();
  // }
}
for (let i = 0; i < closeButtonE.length; i++) {
  const elementsE = closeButtonE[i];

  elementsE.onclick = (e) => modalCloseE();

  modalE.style.display = "none";
  // modalE.style.display = 'none';

  // window.onclick = function (event) {
  // 	if (event.target == modalE) modalCloseE();
  // }
}
